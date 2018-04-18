import React, { Component } from 'react';
import {
  Header,
  Segment,
  Image,
  Icon,
} from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';
import PageCenter from 'components/PageCenter';
import fish from 'assets/moonfish-fish.svg';
import { fillInVars } from 'utils/templates';

import markdownSource from 'templates/privacy-policy.md';

export default class PrivacyPolicy extends Component {
  render() {
    return (
      <PageCenter maxWidth="1000px">
        <Image src={fish} alt="Moonfish" style={{ height: '80px', margin: '0 auto' }} />
        <Header as="h3" textAlign="center" style={{ color: '#FBCE0E', textTransform: 'uppercase' }}>
          Privacy Policy
        </Header>
        <Segment.Group>
          <Segment padded>
            <ReactMarkdown source={fillInVars(markdownSource)} />
          </Segment>
          <Segment secondary>
            <a href="/" style={{ fontSize: '14px' }}><Icon name="left arrow small" /> Take me home</a>
          </Segment>
        </Segment.Group>
      </PageCenter>
    );
  }
}
