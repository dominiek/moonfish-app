import React from 'react';

import {
  Container,
  Image,
} from 'semantic-ui-react';

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import fish from 'assets/moonfish-fish.svg';

const Wrap = styled.div`
  background: #000005;
  border-top: 1px solid rgba(255,255,255,0.3);
  padding: 30px 0;
  text-align: center;
  color: #fff;
  letter-spacing: 0.1em;
  font-size: 14px;

  span {
    color: #FBCE0E;
    text-transform: uppercase;
  }

  a {
    color: #FBCE0E;
    font-weight: 900;
    text-decoration: underline;
  }

  .ui.image {
    height: 30px;
    display: inline-block;
    margin-right: 20px;
  }
`;

export default class Signature extends React.Component {
  render() {
    return (
      <Wrap>
        <Container>
          <Image src={fish} alt="Moonfish Fish" />
          <b>
            <span>Created with <Link as="a" to="/">Moonfish</Link></span> &mdash;
            This Token Sale experience was built using Moonfish.
          </b>
        </Container>
      </Wrap>
    );
  }
}