import { hot } from 'react-hot-loader';

import React from 'react';
import { Provider } from 'mobx-react';
import { Router, Route, Switch } from 'react-router-dom';

import { isLoggedIn } from 'utils/adminAuthentication';

import Authentication from './Authentication';
import Admin from './Admin';
import Homepage from './Homepage';

const App = ({ stores, history }) => (
  <Provider stores={stores}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={isLoggedIn() ? Admin : Homepage} />
        <Authentication />
      </Switch>
    </Router>
  </Provider>
);

export default hot(module)(App);
