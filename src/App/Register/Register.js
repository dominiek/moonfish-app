import React, { Component } from 'react';
import {
  Segment,
  Loader,
  Message,
  Grid,
} from 'semantic-ui-react';

import { Form } from 'react-final-form';
import request from 'utils/request';
import RegisterForm from './Form';
import { getSessionToken } from 'utils/authentication';
import RestartError from './RestartError';
import { FORM_ERROR } from 'final-form';
import { omit, pick } from 'lodash';
import { Link } from 'react-router-dom';

function fetchStatus() {
  return request({ method: 'GET', path: '/1/status' });
}

function fetchApplicant(token) {
  return request({ method: 'GET', path: '/1/applicants/me', token });
}

const checkboxFields = ['acceptWhitepaper', 'acceptTerms', 'acceptCompliance'];

export default class Register extends Component {
  state = {
    applicant: null,
    tokenStatus: null,
    status: { type: 'request' },
    registrationComplete: false
  }

  componentDidMount() {
    const promises = [fetchStatus(), fetchApplicant(getSessionToken())];
    Promise.all(promises).then(([tokenStatus, applicant]) => {
      this.setState({
        tokenStatus,
        applicant,
        status: { type: 'success' }
      });
    }).catch((error) => {
      this.setState({ status: { type: 'failure', error } });
    });
  }

  handleFormSubmit = (values) => {
    return new Promise((resolve) => {
      return request({
        method: 'POST',
        path: '/1/applicants/register',
        body: omit(values, checkboxFields),
        token: getSessionToken()
      }).then(() => {
        this.setState({ registrationComplete: true });
      }).catch((err) => {
        return resolve({ [FORM_ERROR]: err.message });
      });
    });
  }

  render() {
    const {
      applicant,
      status,
      tokenStatus,
      registrationComplete
    } = this.state;

    if (registrationComplete) {
      return (
        <Segment.Group>
          <Segment padded>
            <Message
              info
              icon="rocket"
              header="Thank you for registering!"
              content="We'll contact you when the Token Sale starts"
            />
          </Segment>
        </Segment.Group>
      );
    }

    if (status.type === 'request') return <Loader />;
    if (status.type === 'failure') return <RestartError error={status.error} />;

    const initialValues = applicant.completedRegistration ? {
      ...checkboxFields.reduce((res, key) => {
        res[key] = true;
        return res;
      }, {}),
      ...pick(applicant, ['firstName', 'lastName', 'ethAmount'])
    } : {};

    return (
      <Segment.Group>
        <Segment padded>
          { tokenStatus.isOverSubscribed &&
            <Message
              info
              content="Looks like the whitelist is currently oversubscribed. After completing your registration, we'll put you on the waiting list for a next batch of invites."
            />
          }
          <Form
            initialValues={initialValues}
            onSubmit={this.handleFormSubmit}
            render={RegisterForm}
          />
        </Segment>
        <Segment secondary>
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>
                Authenticated as <b>{applicant.email}</b>
              </Grid.Column>
              <Grid.Column width={6} textAlign="right">
                <Link to="/logout" style={{ fontSize: '14px' }}>Log out</Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Segment.Group>
    );
  }
}
