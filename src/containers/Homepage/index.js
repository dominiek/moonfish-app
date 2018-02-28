import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Header,
  Image,
  Message,
  List,
  Menu,
  Segment,
  Visibility
} from 'semantic-ui-react';
import request from 'utils/request';

import TokenSaleSummary from 'components/TokenSaleSummary';

const FixedMenu = () => (
  <Menu fixed="top" size="large">
    <Container>
      <Menu.Menu position="right">
        <Menu.Item as="a">About</Menu.Item>
        <Menu.Item as="a">Token</Menu.Item>
        <Menu.Item as="a">Whitepaper</Menu.Item>
        <Menu.Item as="a">Roadmap</Menu.Item>
        <Menu.Item className="item">
          <Button to="/apply" as={Link}>Buy Tokens</Button>
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);

export default class HomepageLayout extends Component {
  state = {
    error: null,
    info: null
  };

  componentDidMount() {
    request({
      method: 'GET',
      path: '/1/info',
    })
      .then(info => this.setState({ info }))
      .catch(error => this.setState({ error }));
  }

  hideFixedMenu = () => this.setState({ visible: false });
  showFixedMenu = () => this.setState({ visible: true });

  render() {
    const { visible, error, info } = this.state;
    return (
      <div>

        {visible ? <FixedMenu /> : null}

        <Visibility
          onBottomPassed={this.showFixedMenu}
          onBottomVisible={this.hideFixedMenu}
          once={false}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item position="right">
                  <Menu.Item as="a">About</Menu.Item>
                  <Menu.Item as="a">Token</Menu.Item>
                  <Menu.Item as="a">Whitepaper</Menu.Item>
                  <Menu.Item as="a">Roadmap</Menu.Item>
                  <Button to="/apply" as={Link} inverted>
                    Buy Tokens
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>

            <Container textAlign="left">
              { error && (<Message error content={`System Error: ${error.message}`} />)}
              <Grid
                style={{
                  marginTop: '180px'
                }}
              >
                <Grid.Row>
                  <Grid.Column width={1} />
                  <Grid.Column width={7}>
                    <Header
                      as="h1"
                      content="Open Platform for Token Distribution"
                      inverted
                      style={{
                        fontSize: '2.5em',
                      }}
                    />
                  </Grid.Column>
                  <Grid.Column width={1} />
                  <Grid.Column width={6}>
                    <TokenSaleSummary
                      info={info}
                    />
                  </Grid.Column>
                  <Grid.Column width={1} />
                </Grid.Row>
              </Grid>
            </Container>
          </Segment>
        </Visibility>

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container text>
            <Header as="h3" style={{ fontSize: '2em' }}>
              Introducing Moonfish
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Over the past year we’ve seen a staggering amount of capital raised using token sales - also known as Initial Coin Offerings (ICOs).
              Thanks to emerging standards such as ERC20, ERC720 and NEP5 it’s becoming increasingly easy to digitize assets and to gain liquidity on public Blockchains.
              Doing a token sale has become increasingly complex due to the rapidly changing technological and legal landscape.
            </p>

            <p style={{ fontSize: '1.33em' }}>
              The fact that 10% of all ICO capital raised in 2017 is in the hands of criminals illustrates the growing need for a secure and reliable token sale process.
              The goal of the Moonfish platform is to create open, secure and reliable software for doing token sales.
            </p>

            <p style={{ fontSize: '1.33em' }}>
              All core Moonfish code is free, open source and publicly audit-able.
              The Moonfish platform codifies the latest legal, technical and security best practice in a single end-to-end solution for token sale processes.
            </p>
          </Container>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical inverted>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h3" style={{ fontSize: '2em' }} inverted>
                  Moonfish PoC Tokens
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Large single round token sales often create a time mismatch between developer's rewards and token buyers' interests.
                  A better model is to raise funds at multiple rounds after product market traction is proven.
                </p>
                <p style={{ fontSize: '1.33em' }}>
                  We will do a very limited first PoC round of Moonfish PoC tokens.
                  The goal of this token sale is twofold:
                  1. Proof out that we can do a token sale with the Moonfish software (ICO the ICO software if you will);
                  2. Get some modest funding in place to support the development efforts of the project.
                </p>
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container text textAlign="center">
            <Button primary size="large" content="Download Whitepaper" icon="download" />
          </Container>
        </Segment>


        <Segment style={{ padding: '8em 0em' }} vertical inverted>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={16}>
                <Header as="h3" style={{ fontSize: '2em' }} inverted>
                  Phase 1: Proof of Concept Development
                </Header>
                <p style={{ fontSize: '1.33em' }}>
Before any token sale we want to get a first version of the software up and running. This version will at the minimum include the security best practices and considerations mentioned in this white paper.
In addition to this, it should have a first cut of the whitelisting and participation logic to do token sales.
                </p>
                <Header as="h3" style={{ fontSize: '2em' }} inverted>
                  Phase 2: Moonfish PoC ICO
                </Header>
                <p style={{ fontSize: '1.33em' }}>
This will be a small capped token sale for Moonfish PoC Tokens. We will be using the Moonfish platform to do this token sale. Once completed, it will be the first ICO performed using the Moonfish software.
See “Moonfish Tokens” in Whitepaper for more details about these tokens.
                </p>
                <Header as="h3" style={{ fontSize: '2em' }} inverted>
                  Phase 3: Proof of MVP
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  This phase is the “rinse and repeat” stage where we solicit feedback from the marketplace.
                  The goal is to add additional capabilities and security features to the Moonfish software and to have it used by future token sales. Once we’re seeing steady usage of the software we will have proven out our Minimum Viable Product.
                </p>
                <Header as="h3" style={{ fontSize: '2em' }} inverted>
                  Phase 4: Tokenomics Development, Further Decentralization Roadmap & ICO
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                The MVP phase will give us a lot of feedback from the market.
                Based on this we can define a monetization strategy and longer term roadmap that incorporates tokenomics.
                This will involve a secondary token sale where we convert the Moonfish POC tokens into it.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment inverted vertical style={{ padding: '5em 0em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="About" />
                  <List link inverted>
                    <List.Item as="a">About</List.Item>
                    <List.Item as="a">Token</List.Item>
                    <List.Item as="a">Whitepaper</List.Item>
                    <List.Item as="a">Roadmap</List.Item>
                    <List.Item as="a">Team</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="Services" />
                  <List link inverted>
                    <List.Item as="a">Buy Tokens</List.Item>
                    <List.Item as="a">Privacy Policy</List.Item>
                    <List.Item as="a">Token Sale Terms</List.Item>
                    <List.Item as="a">Admin Login</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header as="h4" inverted>
                    Created with Moonfish
                  </Header>
                  <p>
                    This Token Sale experience was built using Moonfish
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    );
  }
}
