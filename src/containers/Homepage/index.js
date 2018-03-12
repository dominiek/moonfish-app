/* eslint max-len: 0 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Message,
  List,
  Menu,
  Segment,
  Visibility,
  Transition,
  Sidebar
} from 'semantic-ui-react';
import request from 'utils/request';
import styled from 'styled-components';
import HeroBackground from './Hero';
import { Link as ScrollLink, Element } from 'react-scroll';

import logo from 'assets/moonfish-logo.svg';
import fish from 'assets/moonfish-fish.svg';
import moonfishToken from 'assets/moonfish-token.svg';
import iconPhase1 from 'assets/icon-phase1.svg';
import iconPhase2 from 'assets/icon-phase2.svg';
import iconPhase3 from 'assets/icon-phase3.svg';
import iconPhase4 from 'assets/icon-phase4.svg';

import TokenSaleSummary from 'components/TokenSaleSummary';

const Hero = styled.div`
  background: #000005;
  background: linear-gradient(45deg, #000005 0%,#050520 100%);
  height: 100vh;
  color: #fff;

  .hero-wrap {
    display: flex;
    flex: 1;
    flex-direction: row;
  }

  .title-wrap {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    z-index: 1;
    padding-right: 50px;
  }

  .hero-line {
    flex: 0;
    width: 1px;
    background: rgba(255,255,255,0.3);
    height: 50%;
    flex-basis: initial;
    align-self: center;
  }

  .token-sale-summary {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    text-align: center;

    h2,
    h3,
    h5 {
      text-transform: uppercase;
      margin-bottom: 25px;
      color: #FBCE0E;
    }

    > div {
      width: 400px;
      padding: 20px 0;
    }

    .value.value {
      font-weight: 900;
      margin-bottom: 5px;
    }
  }
`;

const TopNav = styled(Menu)`
  &.ui.secondary.inverted.menu {

    .menu {
      margin-top: 27px;
    }

    .menu .item {
      text-transform: uppercase;
      background: none;
      letter-spacing: 0.06em
    }

    .menu .item.button {
      padding-left: 32px;
      padding-right: 32px;
      margin-left: 10px;
      border-radius: 3px !important;
    }

    .menu .item.button:hover {
      background: #FBCE0E !important;
      color: #0B0B4E !important;
    }
  }
`;

const TopNavFixed = styled(TopNav)`
  &.ui.secondary.inverted.menu {
    background: #000005;
    border-bottom: 1px solid rgba(255,255,255,0.3);

    .menu {
      margin-top: 0;
    }
  }
`;

const PageSegment = styled(Segment)`
  &.ui.segment {
    background: #f2f6fc;
    padding: 100px 0;
  }

  &.ui.segment.inverted {
    background: #000005;
    background: linear-gradient(45deg, #000005 0%,#050520 100%);
  }

  .ui.header {
    color: #0B0B4E;
  }
`;

const Footer = styled(Segment)`
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

const Signature = styled.div`
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

const FixedMenu = () => (
  <TopNavFixed fixed="top" inverted secondary>
    <Container>
      <Menu.Menu position="left">
        <Menu.Item className="logo">
          <Link to="/">
            <Image src={logo} alt="Moonfish Logo" style={{ height: '52px' }} />
          </Link>
        </Menu.Item>
      </Menu.Menu>
      <Menu.Menu position="right">
        <Menu.Item as={ScrollLink} spy smooth offset={-140} to="about">About</Menu.Item>
        <Menu.Item as={ScrollLink} spy smooth offset={-160} to="token">Token</Menu.Item>
        <Menu.Item as={ScrollLink} spy smooth offset={-140} to="paper">Whitepaper</Menu.Item>
        <Menu.Item as={ScrollLink} spy smooth offset={-60} to="roadmap">Roadmap</Menu.Item>
        <Menu.Item to="/apply" as={Button} className="basic secondary">
          Buy Tokens
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </TopNavFixed>
);

export default class HomepageLayout extends Component {
  state = {
    error: null,
    info: null,
    sidebarVisible: false
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

  toggleToc = () => {
    this.setState({ sidebarVisible: !this.state.sidebarVisible });
  }

  render() {
    const {
      visible,
      error,
      info,
      sidebarVisible
    } = this.state;

    return (
      <div>
        <Transition.Group animation="fade down" duration={400}>
          {visible && <FixedMenu />}
        </Transition.Group>
        <Sidebar.Pushable>
          <Sidebar as={Menu} visible={sidebarVisible} direction="right" width="thin" animation="push" vertical inverted>
            <Menu.Item className="logo">
              <Link to="/">
                <img src={logo} alt="Moonfish Logo" style={{ height: '80px' }} />
              </Link>
            </Menu.Item>
            <Menu.Item as={ScrollLink} spy smooth offset={-140} to="about">About</Menu.Item>
            <Menu.Item as={ScrollLink} spy smooth offset={-160} to="token">Token</Menu.Item>
            <Menu.Item as={ScrollLink} spy smooth offset={-140} to="paper">Whitepaper</Menu.Item>
            <Menu.Item as={ScrollLink} spy smooth offset={-60} to="roadmap">Roadmap</Menu.Item>
            <Menu.Item to="/apply" as={Button} className="basic secondary">
              Buy Tokens
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>

            <Visibility
              offset={100}
              onBottomPassed={this.showFixedMenu}
              onBottomVisible={this.hideFixedMenu}
              once={false}
            >
              <Hero>
                <Container style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <HeroBackground />
                  <TopNav inverted secondary>
                    <Menu.Menu position="left">
                      <Menu.Item className="logo">
                        <Link to="/">
                          <Image src={fish} alt="Moonfish Fish" style={{ height: '80px' }} />
                        </Link>
                      </Menu.Item>
                    </Menu.Menu>
                    <Menu.Menu position="right">
                      <Menu.Item as={ScrollLink} smooth offset={-100} to="about">About</Menu.Item>
                      <Menu.Item as={ScrollLink} smooth offset={-100} to="token">Token</Menu.Item>
                      <Menu.Item as={ScrollLink} smooth to="paper">Whitepaper</Menu.Item>
                      <Menu.Item as={ScrollLink} smooth offset={-80} to="roadmap">Roadmap</Menu.Item>
                      <Menu.Item to="/apply" as={Button} className="basic secondary">
                        Buy Tokens
                      </Menu.Item>
                      <Menu.Item className="toc" onClick={this.toggleToc}>
                        <Icon name="sidebar" /> Menu
                      </Menu.Item>
                    </Menu.Menu>
                  </TopNav>

                  { error && (<Message error content={`System Error: ${error.message}`} />)}

                  <div className="hero-wrap">
                    <div className="title-wrap">
                      <Header
                        as="h3"
                        content="Moonfish"
                        style={{ color: '#FAD500', textTransform: 'uppercase', marginBottom: '10px' }}
                      />
                      <Header
                        as="h1"
                        content="Open Platform for Token Distribution"
                        inverted
                        style={{ marginTop: '0' }}
                      />
                    </div>
                    <div className="hero-line" />
                    <TokenSaleSummary
                      info={info}
                    />
                  </div>
                </Container>
              </Hero>
            </Visibility>

            <PageSegment vertical>
              <Element name="about">
                <Grid container stackable centered style={{ fontSize: '1.25rem' }}>
                  <Grid.Row>
                    <Grid.Column width={10}>
                      <Header as="h2" style={{ textTransform: 'uppercase', textAlign: 'center' }}>
                        <span style={{ display: 'block', fontSize: '1.2rem', lineHeight: '2rem' }}>Introducing</span>
                        Moonfish
                      </Header>
                      <p>
                        Over the past year we’ve seen a staggering amount of capital raised using token sales - also known as Initial Coin Offerings (ICOs).
                        Thanks to emerging standards such as ERC20, ERC720 and NEP5 it’s becoming increasingly easy to digitize assets and to gain liquidity on public Blockchains.
                        Doing a token sale has become increasingly complex due to the rapidly changing technological and legal landscape.
                      </p>

                      <p>
                        The fact that 10% of all ICO capital raised in 2017 is in the hands of criminals illustrates the growing need for a secure and reliable token sale process.
                        The goal of the Moonfish platform is to create open, secure and reliable software for doing token sales.
                      </p>

                      <p>
                        All core Moonfish code is free, open source and publicly audit-able.
                        The Moonfish platform codifies the latest legal, technical and security best practice in a single end-to-end solution for token sale processes.
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Element>
            </PageSegment>

            <PageSegment vertical inverted>
              <Grid container stackable style={{ fontSize: '1.25rem' }}>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <Element name="token">
                      <Header as="h2" style={{ color: '#fad500' }}>
                        MOONFISH PoC Tokens
                      </Header>
                      <p>
                      Large single round token sales often create a time mismatch between developer's rewards and token buyers' interests.
                      A better model is to raise funds at multiple rounds after product market traction is proven.
                      </p>
                      <p>
                        We will do a very limited first PoC round of Moonfish PoC tokens.
                      </p>
                      <p>
                        <b>The goal of this token sale is twofold:</b>
                      </p>
                      <ol style={{ lineHeight: '1.4285em' }}>
                        <li>
                        Proof out that we can do a token sale with the Moonfish software (ICO the ICO software if you will);
                          <br /><br />
                        </li>
                        <li>
                        Get some modest funding in place to support the development efforts of the project.
                        </li>
                      </ol>
                    </Element>
                  </Grid.Column>
                  <Grid.Column verticalAlign="middle" width={8}>
                    <Image src={moonfishToken} alt="Moonfish PoC Token" style={{ margin: '0 auto' }} />
                  </Grid.Column>
                </Grid.Row>
                <hr
                  style={{
                    width: '100%',
                    borderColor: 'rgba(255,255,255,0.5)',
                    margin: '60px 0',
                    borderBottom: '0'
                  }}
                />
                <Grid.Row centered>
                  <Grid.Column width={6} textAlign="center">
                    <Element name="paper">
                      <Header as="h2" style={{ color: '#fad500' }}>
                        Whitepaper
                      </Header>
                      <br />
                      <p>Read about MOONFISH business idea and technical implementations of the project.</p>
                      <br />
                      <Button as={Link} to="" basic secondary size="large" style={{ textTransform: 'uppercase' }}>
                        Download Whitepaper&nbsp;&nbsp;
                        <Icon name="down arrow" style={{ marginRight: '0' }} />
                      </Button>
                    </Element>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </PageSegment>

            <Element name="roadmap">
              <PageSegment vertical>
                <Grid container stackable verticalAlign="middle" style={{ fontSize: '1.25rem' }}>
                  <Grid.Row>
                    <Grid.Column width={5} />
                    <Grid.Column width={9}>
                      <Header as="h2">
                        Roadmap
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={1} />
                    <Grid.Column width={4} verticalAlign="middle">
                      <Image src={iconPhase1} alt="Phase 1" style={{ height: '90px', margin: '0 auto' }} />
                    </Grid.Column>
                    <Grid.Column width={9}>
                      <Header as="h4">
                        Phase 1: Proof of Concept Development
                      </Header>
                      <p>
      Before any token sale we want to get a first version of the software up and running. This version will at the minimum include the security best practices and considerations mentioned in this white paper.
      In addition to this, it should have a first cut of the whitelisting and participation logic to do token sales.
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={1} />
                    <Grid.Column width={4} verticalAlign="middle">
                      <Image src={iconPhase2} alt="Phase 2" style={{ height: '80px', margin: '0 auto' }} />
                    </Grid.Column>
                    <Grid.Column width={9}>
                      <Header as="h4">
                        Phase 2: Moonfish PoC ICO
                      </Header>
                      <p>
      This will be a small capped token sale for Moonfish PoC Tokens. We will be using the Moonfish platform to do this token sale. Once completed, it will be the first ICO performed using the Moonfish software.
      See “Moonfish Tokens” in Whitepaper for more details about these tokens.
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={1} />
                    <Grid.Column width={4} verticalAlign="middle">
                      <Image src={iconPhase3} alt="Phase 3" style={{ height: '100px', margin: '0 auto' }} />
                    </Grid.Column>
                    <Grid.Column width={9}>
                      <Header as="h4">
                        Phase 3: Proof of MVP
                      </Header>
                      <p>
                        This phase is the “rinse and repeat” stage where we solicit feedback from the marketplace.
                        The goal is to add additional capabilities and security features to the Moonfish software and to have it used by future token sales. Once we’re seeing steady usage of the software we will have proven out our Minimum Viable Product.
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={1} />
                    <Grid.Column width={4} verticalAlign="middle">
                      <Image src={iconPhase4} alt="Phase 4" style={{ height: '100px', margin: '0 auto' }} />
                    </Grid.Column>
                    <Grid.Column width={9}>
                      <Header as="h4">
                        Phase 4: Tokenomics Development, Further Decentralization Roadmap & ICO
                      </Header>
                      <p>
                      The MVP phase will give us a lot of feedback from the market.
                      Based on this we can define a monetization strategy and longer term roadmap that incorporates tokenomics.
                      This will involve a secondary token sale where we convert the Moonfish POC tokens into it.
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </PageSegment>
            </Element>

            <Footer inverted vertical>
              <Container>
                <Grid inverted stackable columns={3} textAlign="center">
                  <Grid.Row stretched>
                    <Grid.Column>
                      <List link inverted>
                        <List.Item as={ScrollLink} spy smooth offset={-140} to="about">About</List.Item>
                        <List.Item as={ScrollLink} spy smooth offset={-160} to="token">Token</List.Item>
                        <List.Item as={ScrollLink} spy smooth offset={-140} to="paper">Whitepaper</List.Item>
                        <List.Item as={ScrollLink} spy smooth offset={-60} to="roadmap">Roadmap</List.Item>
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
            </Footer>

            <Signature>
              <Container>
                <Image src={fish} alt="Moonfish Fish" />
                <b>
                  <span>Created with <Link as="a" to="/">Moonfish</Link></span> &mdash;
                  This Token Sale experience was built using Moonfish.
                </b>
              </Container>
            </Signature>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}