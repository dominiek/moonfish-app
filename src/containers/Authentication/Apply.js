import React, { Component } from 'react';
import {
  Header,
  Form,
  Segment,
  Button,
  Input,
  Message
} from 'semantic-ui-react';
import PageCenter from 'components/PageCenter';

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }
  render() {
    const { error } = this.state;
    const sent = false;
    return (
      <PageCenter>
        <Header as="h2" textAlign="center">
          Apply to Whitelist
        </Header>
        <Segment.Group>
          <Segment>
            { error && (<Message error content={error.message} />) }
            { sent ? (
              <Message info content="Please follow the instructions in the email we sent to your mailbox" />
            ) : (
              <Form size="large">
                <Form.Field>
                  <Input
                    icon="mail"
                    iconPosition="left"
                    placeholder="E-mail Address"
                    type="text"
                  />
                </Form.Field>
                <Button
                  fluid
                  primary
                  size="large"
                  content="Register"
                />
              </Form>
            ) }
          </Segment>
          <Segment secondary />
        </Segment.Group>
      </PageCenter>
    );
  }
}
