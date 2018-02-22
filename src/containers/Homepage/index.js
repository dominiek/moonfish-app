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
        <Menu.Item as="a">Team</Menu.Item>
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
                  <Menu.Item as="a">Team</Menu.Item>
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
              Moonfish is an open software stack for Token Sales and Initial Coin Offerings.
            </p>
          </Container>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical inverted>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h3" style={{ fontSize: '2em' }} inverted>
                  Moonfish Token
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  To the Moon my friends!
                </p>
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
                <Image
                  bordered
                  rounded
                  size="large"
                  src="/assets/images/wireframe/white-image.png"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container text>
            <Header as="h3" style={{ fontSize: '2em' }}>
              Whitepaper
            </Header>
            <p style={{ fontSize: '1.33em' }} />
            <Button primary size="large" content="PDF" icon="download" />
          </Container>
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
