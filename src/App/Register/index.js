import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';

import request from 'utils/request';
import PageCenter from 'components/PageCenter';
import LogoTitle from 'components/LogoTitle';
import { saveSessionToken } from 'utils/authentication';
import RestartError from './RestartError';

import Register from './Register';

const getToken = (props) => {
  const { location } = props;
  const { search } = location;
  if (!search || !search.length) return null;
  const md = search.match(/token=([^&]+)$/);
  if (!md || !md[1]) return null;
  return md[1];
};

export default class RegisterContainer extends Component {
  constructor(props) {
    super(props);
    const token = getToken(props);
    this.state = {
      status: token ? { type: 'request' } : { type: 'failure', error: { message: 'Missing token, confirm the link in the email.' } },
      token
    };
  }

  componentDidMount() {
    if (this.state.token) {
      this.fetchToken().then(() => {
        this.setState({ status: { type: 'success' } });
      }).catch(error => {
        this.setState({ status: { type: 'failure', error } });
      });
    }
  }
  fetchToken = () => {
    return request({
      method: 'POST',
      path: '/1/applicants/authenticate',
      body: {
        token: this.state.token
      }
    }).then((result) => {
      saveSessionToken(result.token);
    });
  }
  render() {
    const { status } = this.state;
    if (status.type === 'request') return (<Loader />);
    return (
      <PageCenter>
        <LogoTitle title="Whitelist Registration" />
        { status.type === 'failure' &&
          <RestartError error={status.error} />
        }
        { status.type === 'success' && <Register /> }
      </PageCenter>
    );
  }
}
