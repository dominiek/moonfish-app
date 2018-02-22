import React, { Component } from 'react';
import {
  Header,
  Form,
  Segment,
  Button,
  Loader,
  Input,
  Message,
  Grid,
} from 'semantic-ui-react';
import request from 'utils/request';
import PageCenter from 'components/PageCenter';
import { saveSessionToken, getSessionToken, hasSession } from 'utils/authentication';

const getMagicToken = (props) => {
  const { location } = props;
  const { search } = location;
  if (!search || !search.length) return null;
  const md = search.match(/magicToken=([^&]+)$/);
  if (!md || !md[1]) return null;
  return md[1];
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      applicant: null,
    };
  }
  componentDidMount() {
    this.authenticateWithMagicToken();
  }
  authenticateWithMagicToken() {
    const magicToken = getMagicToken(this.props);
    if (!magicToken && !hasSession()) {
      return this.setState({
        error: new Error('No magic token or session detected'),
        loading: false,
      });
    }
    if (magicToken) {
      request({
        method: 'POST',
        path: '/1/applicants/sessions',
        body: {
          magicToken
        }
      })
        .then((result) => {
          if (!result || !result.token) {
            this.setState({
              error: new Error('Bad token response from server'),
              loading: false
            });
          } else {
            saveSessionToken(result.token);
            this.setState({ applicant: result.applicant, loading: false });
          }
        })
        .catch(error => this.setState({ error, loading: false }));
    } else {
      request({
        method: 'GET',
        path: '/1/applicants/sessions',
        token: getSessionToken()
      })
        .then((applicant) => {
          this.setState({ applicant, loading: false });
        })
        .catch(error => this.setState({ error, loading: false }));
    }

    return null;
  }
  renderWizard() {
    const { applicant } = this.state;
    return (
      <Segment.Group>
        <Segment>
          Starting wizard
        </Segment>
        <Segment secondary>
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>
                Authenticated as <b>{applicant.email}</b>
              </Grid.Column>
              <Grid.Column width={6} textAlign="right">
                <a href="/end-session">Log out</a>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Segment.Group>
    );
  }
  render() {
    const { error, loading } = this.state;
    if (loading) return (<Loader />);
    return (
      <PageCenter>
        <Header as="h2" textAlign="center">
          Whitelist Registration
        </Header>
        {
          error ? (
            <div>
              <Message error content={error.message} />
              <p>Please <a href="/apply">restart the application process</a></p>
            </div>
          ) : this.renderWizard()
        }
      </PageCenter>
    );
  }
}
