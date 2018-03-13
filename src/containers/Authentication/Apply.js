import React, { Component } from 'react';
import {
  Header,
  Form,
  Segment,
  Button,
  Input,
  Message,
  Image,
  Icon
} from 'semantic-ui-react';
import request from 'utils/request';
import PageCenter from 'components/PageCenter';

import fish from 'assets/moonfish-fish.svg';

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
        <Image src={fish} alt="Moonfish" style={{ height: '80px', margin: '0 auto' }} />
        <Header as="h3" textAlign="center" style={{ color: '#FBCE0E', textTransform: 'uppercase' }}>
          Apply to Whitelist
        </Header>
        <Segment.Group>
          <Segment padded>
            { error && (<Message error content={error.message} />) }
            { result ? (
              <Message info>
                <Message.Header>Mail sent!</Message.Header>
                <p>
                  To continue the application process,
                  please follow the instructions in the email we sent to { result.email }
                </p>
                <p>
                  We've created a key phrase that you can use to
                  make sure communication is really from us.
                  Your unique phrase is:
                </p>
                <p><strong>{ result.mnemonicPhrase}</strong></p>
                <p>
                  We recommend you write down this phrase to
                  validate any future communication from us.
                </p>
              </Message>
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
                  submit
                />
              </Form>
            ) }
          </Segment>
          <Segment secondary>
            <a href="/" style={{ fontSize: '14px' }}><Icon name="left arrow small" /> Take me back</a>
          </Segment>
        </Segment.Group>
      </PageCenter>
    );
  }
}
