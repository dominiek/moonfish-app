import React, { Component } from 'react';
import {
  Header,
  Form,
  Segment,
  Button,
  Loader,
  Input,
  Checkbox,
  Message,
  Grid,
  Image
} from 'semantic-ui-react';
import request from 'utils/request';
import PageCenter from 'components/PageCenter';
import { saveSessionToken, getSessionToken, hasSession } from 'utils/authentication';

import fish from 'assets/moonfish-fish.svg';

const getToken = (props) => {
  const { location } = props;
  const { search } = location;
  if (!search || !search.length) return null;
  const md = search.match(/token=([^&]+)$/);
  if (!md || !md[1]) return null;
  return md[1];
};

const getValidationError = (params) => {
  const { acceptTerms, acceptCompliance, acceptWhitepaper } = params;
  if (!acceptTerms || !acceptCompliance || !acceptWhitepaper) {
    return new Error('Please accept all necessary confirmations');
  }
  return null;
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      fatalError: null,
      error: null,
      applicant: null,
      params: {},
      finished: false,
      info: null,
    };
  }
  componentDidMount() {
    this.authenticateWithToken();
    this.loadInfo();
  }
  onSubmit() {
    const { params } = this.state;
    this.setState({ loading: false, error: null, finished: false });
    const validationError = getValidationError(params);
    if (validationError) return this.setState({ error: validationError, loading: false });
    return request({
      method: 'POST',
      path: '/1/applicants/register',
      body: params,
      token: getSessionToken(),
    }).then(() => this.setState({ finished: true, loading: false }))
      .catch(error => this.setState({ error, loading: false }));
  }
  setParams(field, value) {
    const { params } = this.state;
    params[field] = value;
    this.setState({ params });
  }
  loadInfo() {
    request({
      method: 'GET',
      path: '/1/info',
    })
      .then(info => this.setState({ info }))
      .catch(error => this.setState({ error }));
  }
  authenticateWithToken() {
    const token = getToken(this.props);
    if (!token && !hasSession()) {
      return this.setState({
        fatalError: new Error('No token or session detected'),
        loading: false,
      });
    }
    if (token) {
      request({
        method: 'POST',
        path: '/1/applicants/sessions',
        body: {
          token
        }
      })
        .then((result) => {
          if (!result || !result.token) {
            this.setState({
              fatalError: new Error('Bad token response from server'),
              loading: false
            });
          } else {
            saveSessionToken(result.token);
            this.setState({ applicant: result.applicant, loading: false });
          }
        })
        .catch(fatalError => this.setState({ fatalError, loading: false }));
    } else {
      request({
        method: 'GET',
        path: '/1/applicants/sessions',
        token: getSessionToken()
      })
        .then((applicant) => {
          this.setState({ applicant, loading: false });
        })
        .catch((error) => {
          const fatalError = error;
          if (fatalError.message === 'jwt expired') {
            fatalError.message = 'Your session has expired';
          }
          this.setState({ fatalError, loading: false });
        });
    }

    return null;
  }
  renderRegistration() {
    const {
      applicant,
      loading,
      error,
      finished,
      info
    } = this.state;
    return (
      <Segment.Group>
        <Segment padded>
          { error && (<Message error content={error.message} />)}
          { finished ? (
            <Message
              info
              icon="rocket"
              header="Thank you for registering!"
              content="We'll contact you when the Token Sale starts"
            />
          ) : (
            <Form size="large" onSubmit={() => this.onSubmit()}>
              { info && info.status.isOverSubscribed && (
                <Message
                  info
                  content="Looks like the whitelist is currently oversubscribed. After completing your registration, we'll put you on the waiting list for a next batch of invites."
                />
              ) }
              <b>Please read and acknowledge</b>
              <br /><br />
              <Form.Field>
                <Checkbox
                  onChange={(e, props) => this.setParams('acceptWhitepaper', props.checked)}
                  label={(<label>I confirm that I have read and understood the <a href="" target="_blank">Moonfish whitepaper</a></label>)}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  onChange={(e, props) => this.setParams('acceptTerms', props.checked)}
                  label={(<label>I confirm that I have read and understood the <a href="" target="_blank">Token Sale Terms</a> and <a href="" target="_blank">Privacy Policy</a></label>)}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  onChange={(e, props) => this.setParams('acceptCompliance', props.checked)}
                  label={(
                    <label>
                      I confirm that by purchasing these tokens I am complying
                      with the relevant laws of my domestic country
                    </label>
                  )}
                />
              </Form.Field>
              <Form.Field>
                <label>First Name</label>
                <Input
                  onChange={(e, props) => this.setParams('firstName', props.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Last Name</label>
                <Input
                  onChange={(e, props) => this.setParams('lastName', props.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>How much are you planning to invest?</label>
                <Input
                  label={{ basic: true, content: 'ETH' }}
                  labelPosition="right"
                  placeholder="Ethereum amount"
                  onChange={(e, props) => this.setParams('ethAmount', props.value)}
                />
              </Form.Field>
              <Button
                fluid
                primary
                size="large"
                content="Register"
                loading={loading}
                submit
              />
            </Form>
          ) }

        </Segment>
        <Segment secondary>
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>
                Authenticated as <b>{applicant.email}</b>
              </Grid.Column>
              <Grid.Column width={6} textAlign="right">
                <a href="/end-session" style={{ fontSize: '14px' }}>Log out</a>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Segment.Group>
    );
  }
  render() {
    const { fatalError, loading } = this.state;
    if (loading) return (<Loader />);
    return (
      <PageCenter>
        <Image src={fish} alt="Moonfish" style={{ height: '80px', margin: '0 auto' }} />
        <Header as="h3" textAlign="center" style={{ color: '#FBCE0E', textTransform: 'uppercase' }}>
          Whitelist Registration
        </Header>
        {
          fatalError ? (
            <Segment textAlign="center" >
              <Message error content={fatalError.message} />
              <p><a href="/apply">Please restart the application process</a></p>
            </Segment>
          ) : this.renderRegistration()
        }
      </PageCenter>
    );
  }
}
