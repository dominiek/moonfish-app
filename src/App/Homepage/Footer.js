import React from 'react';

import {
  Container,
  Grid,
  Image,
  List,
  Segment,
} from 'semantic-ui-react';

import { Link } from 'react-router-dom';

import styled from 'styled-components';
import logo from 'assets/moonfish-logo.svg';

const FooterSegment = styled(Segment)`
  &.ui.segment.inverted {
    background: #000005;
    background: linear-gradient(45deg, #000005 0%,#050520 100%);
    padding: 50px 0;

    .column {
      border-left: 1px solid rgba(255,255,255,0.3);

      @media (max-width: 767px) {
        border-left: 0;

        .footer-logo {
          height: 60px;
        }

        &:nth-child(1) {
          order: 2;
        }

        &:nth-child(2) {
          order: 3;
        }

        &:nth-child(3) {
          order: 1;
        }
      }

      @media (min-width: 768px) and (max-width: 991px) {
        &:first-child {
          border-left: 0;
        }
      }
    }

    .grid.column {
      border: 0;
    }

    .footer-logo {
      height: 80px;
      margin: 0 auto;
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
                  {this.props.children}
                </List>
              </Grid.Column>
              <Grid.Column>
                <List link inverted>
                  <List.Item as={Link} to="/apply">Buy Tokens</List.Item>
                  <List.Item as={Link} to="/privacy">Privacy Policy</List.Item>
                  <List.Item as={Link} to="/terms">Token Sale Terms</List.Item>
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
