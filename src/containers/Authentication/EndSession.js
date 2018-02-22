import React, { Component } from 'react';
import { clearSessionToken } from 'utils/authentication';
import PageLoader from 'components/PageLoader';

export default class Logout extends Component {
  componentDidMount() {
    clearSessionToken();
    document.location.href = '/';
  }
  render() {
    return (
      <PageLoader content="Ending session" />
    );
  }
}
