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
  Sidebar,
  Divider
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
import whitepaperPdf from 'downloads/Moonfish_Draft.pdf';

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
    padding-right: 40px;
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

  @media (max-width: 767px) {
    .hero-wrap {
      flex-direction: column;
    }

    .title-wrap {
      text-align: center;
      padding-right: 0;

      h1 {
        font-size: 2.875rem;
      }
    }

    .hero-line {
      height: 1px;
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    .title-wrap {
      h1 {
        font-size: 2rem;
      }

      h3 {
        font-size: 1.5rem;
      }
    }

    .token-sale-summary {
      .ui.small.statistics .statistic > .value, .ui.small.statistic > .value {
        font-size: 2em !important;
      }
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    .token-sale-summary > div {
      width: 320px;
    }

    .title-wrap {
      padding-right: 20px;

      h1 {
        font-size: 2.875rem;
      }
    }
  }
`;

const TopNav = styled(Menu)`
  &.ui.secondary.inverted.menu {

    .menu {
      margin-top: 27px;

      @media (max-width: 767px) {
        margin-top: 0;
      }
    }

    .menu .item {
      text-transform: uppercase;
      background: none;
      letter-spacing: 0.06em
    }

    .menu .item.logo img {
      height: 80px;

      @media (max-width: 480px) {
        height: 50px;
      }

      @media (min-width: 481px) and (max-width: 767px) {
        height: 60px;
      }
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

    .menu.right .item {
      @media(max-width: 991px) {
        display: none;
      }
    }

    .menu.right .item.toc {
      border-bottom: 0;

      @media(min-width: 992px) {
        display: none;
      }
      @media(max-width: 991px) {
        display: flex;
      }

      .icon {
        font-size: 1.2em;
      }
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
    font-size: 1.25rem;

    @media (max-width: 480px) {
      padding: 40px 10px;
      font-size: 1.125rem;

      .empty-column {
        display: none;
      }
    }

    @media (min-width: 481px) and (max-width: 767px) {
      padding: 60px 10px;
      font-size: 1.125rem;

      .empty-column {
        display: none;
      }
    }
  }

  &.ui.segment.inverted {
    background: #000005;
    background: linear-gradient(45deg, #000005 0%,#050520 100%);
  }

  .ui.header {
    color: #0B0B4E;
  }

  .moonfish-token {
    margin: 0 auto;

    @media (max-width: 767px) {
      height: 180px;
    }
  }
`;

const Footer = styled(Segment)`
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

const FixedMenu = (props) => (
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
        <Menu.Item as={ScrollLink} spy smooth offset={-100} to="about">About</Menu.Item>
        <Menu.Item as={ScrollLink} spy smooth offset={-100} to="paper">Whitepaper</Menu.Item>
        <Menu.Item as={ScrollLink} spy smooth offset={-120} to="token">Token</Menu.Item>
        <Menu.Item as={ScrollLink} spy smooth offset={-20} to="roadmap">Roadmap</Menu.Item>
        <Menu.Item as={ScrollLink} spy smooth offset={-20} to="code">Code</Menu.Item>
        <Menu.Item to="/apply" as={Link} className="basic secondary">
          Buy Tokens
        </Menu.Item>
        <Menu.Item className="toc" onClick={props.toggleToc}>
          <Icon name="sidebar" /> Menu
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </TopNavFixed>
);

const SidebarMenu = styled(Sidebar)`
  &.sidebar.sidebar {
    background: #000005;
    border-left: 1px solid rgba(255,255,255,0.5);
    text-align: center;

    &.ui.vertical.inverted.menu.menu {
      .item {
        text-transform: uppercase;
        border-radius: 3px !important;
        background: none;
        letter-spacing: 0.12em;
        display: inline-block;
        margin-bottom: 20px;
        font-size: 14px;

        &::before {
          background: none;
        }
      }

      .item.button {
        padding-left: 10px;
        padding-right: 10px;
      }

      .item.logo {
        margin: 15px 0 10px 0;
        border-bottom: 2px solid transparent;
      }
    }
  }
`;

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
          {visible && <FixedMenu toggleToc={this.toggleToc} />}
        </Transition.Group>

        <Sidebar.Pushable>
          <SidebarMenu as={Menu} visible={sidebarVisible} direction="right" width="thin" animation="push" vertical inverted>
            <Menu.Item className="logo">
              <Link to="/" onClick={this.toggleToc}>
                <img src={fish} alt="Moonfish" style={{ height: '60px' }} />
              </Link>
            </Menu.Item>
            <Menu.Item as={ScrollLink} spy smooth offset={-100} to="about" onClick={this.toggleToc}>About</Menu.Item>
            <Menu.Item as={ScrollLink} spy smooth offset={-100} to="paper" onClick={this.toggleToc}>Whitepaper</Menu.Item>
            <Menu.Item as={ScrollLink} spy smooth offset={-110} to="token" onClick={this.toggleToc}>Token</Menu.Item>
            <Menu.Item as={ScrollLink} spy smooth offset={-20} to="roadmap" onClick={this.toggleToc}>Roadmap</Menu.Item>
            <Menu.Item as={ScrollLink} spy smooth offset={-20} to="code" onClick={this.toggleToc}>Code</Menu.Item>
            <Menu.Item to="/apply" as={Link} className="basic secondary" onClick={this.toggleToc}>
              Buy Tokens
            </Menu.Item>
          </SidebarMenu>
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
                          <Image src={fish} alt="Moonfish Fish" />
                        </Link>
                      </Menu.Item>
                    </Menu.Menu>
                    <Menu.Menu position="right">
                      <Menu.Item as={ScrollLink} spy smooth offset={-100} to="about">About</Menu.Item>
                      <Menu.Item as={ScrollLink} spy smooth offset={-100} to="paper">Whitepaper</Menu.Item>
                      <Menu.Item as={ScrollLink} spy smooth offset={-110} to="token">Token</Menu.Item>
                      <Menu.Item as={ScrollLink} spy smooth offset={-20} to="roadmap">Roadmap</Menu.Item>
                      <Menu.Item as={ScrollLink} spy smooth offset={-20} to="code">Code</Menu.Item>
                      <Menu.Item to="/apply" as={Link} className="basic secondary">
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
                <Grid container stackable centered>
                  <Grid.Row>
                    <Grid.Column width={10}>
                      <Header as="h2" style={{ textTransform: 'uppercase', textAlign: 'center' }}>
                        <span style={{ display: 'block', lineHeight: '2rem', fontSize: '1.2rem' }}>Introducing</span>
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
              <Grid container stackable>
                <Grid.Row centered>
                  <Grid.Column width={8} textAlign="center">
                    <Element name="paper">
                      <Header as="h2" style={{ color: '#fad500' }}>
                        Whitepaper
                      </Header>
                      <br />
                      <p>
                        Read about the MOONFISH platform in our draft whitepaper.
                      </p>
                      <br />
                      <Button as="a" href={whitepaperPdf} target="_blank" basic secondary size="large" style={{ textTransform: 'uppercase' }}>
                        Download Whitepaper&nbsp;&nbsp;
                        <Icon name="down arrow" style={{ marginRight: '0' }} />
                      </Button>
                    </Element>
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
                <Grid.Row>
                  <Grid.Column width={8}>
                    <Element name="token">
                      <Header as="h2" style={{ color: '#fad500' }}>
                        MOONFISH PoC Tokens
                      </Header>
                      <p>
                        We are planning a small initial token pre-sale for Moonfish.
                        The goal of this “Moonfish PoC Token Micro-Sale” is twofold:
                        1. Prove out that we can do a token sale with the Moonfish software (ICO the ICO software if you will);
                        2. Get some modest funding in place to support the development efforts of the project.
                      </p>

                      <p>
                        <i>
                          Disclaimer: The core Moonfish platform is open source and will remain open source.
                          These Moonfish PoC tokens will have no economic return or value.
                          They are a thank you token received upon giving a donation.
                        </i>
                      </p>

                      <p>
                        Once we have proved out the Moonfish MVP (see roadmap) it is the project’s intention to do a secondary token sale with tokens that have utility economics incorporated in the network.
                      </p>
                    </Element>
                  </Grid.Column>
                  <Grid.Column verticalAlign="middle" width={8}>
                    <Image src={moonfishToken} alt="Moonfish PoC Token" className="moonfish-token" />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </PageSegment>

            <Element name="roadmap">
              <PageSegment vertical>
                <Grid container stackable verticalAlign="middle">
                  <Grid.Row>
                    <Grid.Column width={5} />
                    <Grid.Column width={9}>
                      <Header as="h2">
                        Roadmap
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={1} className="empty-column" />
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
                    <Grid.Column width={1} className="empty-column" />
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
                    <Grid.Column width={1} className="empty-column" />
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
                    <Grid.Column width={1} className="empty-column" />
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


            <PageSegment vertical inverted>
              <Grid container stackable>
                <Grid.Row centered>
                  <Grid.Column width={8} textAlign="center">
                    <Element name="code">
                      <Header as="h2" style={{ color: '#fad500' }}>
                        Source Code
                      </Header>
                      <br />
                      <p>
                        All source code for this token sale API, application and Whitepaper is freely available on Github:
                      </p>
                      <Divider hidden />
                      <Button
                        as="a"
                        href="http://github.com/dominiek/moonfish-api"
                        target="_blank"
                        basic
                        secondary
                        size="large"
                        style={{ textTransform: 'uppercase', marginRight: '1em', marginBottom: '1em' }}
                        content="Moonfish API"
                        icon="github"
                      />
                      <Button
                        as="a"
                        href="http://github.com/dominiek/moonfish-app"
                        target="_blank"
                        basic
                        secondary
                        size="large"
                        style={{ textTransform: 'uppercase', marginRight: '1em', marginBottom: '1em' }}
                        content="Moonfish App"
                        icon="github"
                      />
                      <Button
                        as="a"
                        href="http://github.com/dominiek/moonfish-whitepaper"
                        target="_blank"
                        basic
                        secondary
                        size="large"
                        style={{ textTransform: 'uppercase', marginRight: '1em', marginBottom: '1em' }}
                        content="Moonfish Whitepaper"
                        icon="github"
                      />
                    </Element>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </PageSegment>

            <Footer inverted vertical>
              <Container>
                <Grid inverted stackable columns={3} textAlign="center">
                  <Grid.Row stretched>
                    <Grid.Column>
                      <List link inverted>
                        <Menu.Item as={ScrollLink} spy smooth offset={-100} to="about">About</Menu.Item>
                        <Menu.Item as={ScrollLink} spy smooth offset={-110} to="token">Token</Menu.Item>
                        <Menu.Item as={ScrollLink} spy smooth offset={-100} to="paper">Whitepaper</Menu.Item>
                        <Menu.Item as={ScrollLink} spy smooth offset={-20} to="roadmap">Roadmap</Menu.Item>
                        <Menu.Item as={ScrollLink} spy smooth offset={-20} to="code">Code</Menu.Item>
                      </List>
                    </Grid.Column>
                    <Grid.Column>
                      <List link inverted>
                        <List.Item as="a" href="/apply">Buy Tokens</List.Item>
                        <List.Item as="a">Privacy Policy</List.Item>
                        <List.Item as="a">Token Sale Terms</List.Item>
                        <List.Item as="a">Admin Login</List.Item>
                      </List>
                    </Grid.Column>
                    <Grid.Column>
                      <Image src={logo} alt="Moonfish Logo" className="footer-logo" />
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
