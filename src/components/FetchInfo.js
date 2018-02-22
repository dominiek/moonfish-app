
import React, { Component } from 'react';
import {
  Loader,
  Message
} from 'semantic-ui-react';
import request from 'utils/request';

export default class FetchInfo extends Component {
  state = {
    loading: false,
    error: null,
    result: null,
  }
  componentDidMount() {
    const loading = false;
    request({
      method: 'GET',
      path: '/1/info',
    })
      .then(result => this.setState({ result, loading }))
      .catch(error => this.setState({ error, loading }));
  }
  render() {
    const { loading, result, error } = this.state;
    if (loading) return (<Loader />);
    if (error) return (<Message error content={error.message} />);
    return this.props.onRender(result);
  }
}
