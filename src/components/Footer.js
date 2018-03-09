import React from 'react';

import {
  Container,
  Grid,
  Image,
  List,
  Segment,
} from 'semantic-ui-react';

import styled from 'styled-components';
import logo from 'assets/moonfish-logo.svg';

const FooterSegment = styled(Segment)`
  &.ui.segment.inverted {
    background: #000005;
    background: linear-gradient(45deg, #000005 0%,#050520 100%);
    padding: 50px 0;

    .column {
      border-left: 1px solid rgba(255,255,255,0.3);
    }

    .grid.column {
      border: 0;
    }

    .link {
      text-transform: uppercase;
      display: flex;
      flex-direction: column;
      justify-content: center;

      a {
        color: rgba(255,255,255,0.7);
        line-height: 1.75rem;
      }
    }

  }
`;

export default class Footer extends React.Component {
  render() {
    return (
      <FooterSegment inverted vertical>
        <Container>
          <Grid inverted stackable columns={3} textAlign="center">
            <Grid.Row stretched>
              <Grid.Column>
                <List link inverted>
                  <List.Item as="a">About</List.Item>
                  <List.Item as="a">Token</List.Item>
                  <List.Item as="a">Whitepaper</List.Item>
                  <List.Item as="a">Roadmap</List.Item>
                  <List.Item as="a">Team</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column>
                <List link inverted>
                  <List.Item as="a">Buy Tokens</List.Item>
                  <List.Item as="a">Privacy Policy</List.Item>
                  <List.Item as="a">Token Sale Terms</List.Item>
                  <List.Item as="a">Admin Login</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column>
                <Image src={logo} alt="Moonfish Logo" style={{ height: '80px', margin: '0 auto' }} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </FooterSegment>
    );
  }
}