import React, { Component } from 'react';
import {
  Header,
  Form,
  Segment,
  Button,
  Input,
  Message
} from 'semantic-ui-react';
import request from 'utils/request';
import PageCenter from 'components/PageCenter';

export default class Apply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {},
      loading: false,
      error: null,
      result: null,
    };
  }
  onSubmit() {
    const { params } = this.state;
    this.setState({ loading: false, error: null, result: null });
    request({
      method: 'POST',
      path: '/1/applicants/apply',
      body: params
    }).then(result => this.setState({ result, loading: false }))
      .catch(error => this.setState({ error, loading: false }));
  }
  setParams(field, value) {
    const { params } = this.state;
    params[field] = value;
    this.setState({ params });
  }
  render() {
    const { error, loading, result } = this.state;
    return (
      <PageCenter>
        <Header as="h2" textAlign="center">
          Apply to Whitelist
        </Header>
        <Segment.Group>
          <Segment>
            { error && (<Message error content={error.message} />) }
            { result ? (
              <Message info content="Please follow the instructions in the email we sent to your mailbox" />
            ) : (
              <Form size="large" onSubmit={() => this.onSubmit()}>
                <Form.Field>
                  <Input
                    icon="mail"
                    iconPosition="left"
                    placeholder="E-mail Address"
                    onChange={(e, props) => this.setParams('email', props.value)}
                    type="text"
                  />
                </Form.Field>
                <Button
                  fluid
                  primary
                  size="large"
                  content="Register"
                  loading={loading}
                  onClick={() => this.onSubmit()}
                />
              </Form>
            ) }
          </Segment>
          <Segment secondary>
            <a href="/">Take me back</a>
          </Segment>
        </Segment.Group>
      </PageCenter>
    );
  }
}
