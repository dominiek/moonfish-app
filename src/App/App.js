import { hot } from 'react-hot-loader';

import React from 'react';
import { Provider } from 'mobx-react';
import { Router, Route, Switch } from 'react-router-dom';

import Homepage from './Homepage';
import Apply from './Apply';
import Register from './Register';
import Logout from './Logout';
import PrivatePolicy from './PrivacyPolicy';
import Terms from './Terms';

const App = ({ stores, history }) => (
  <Provider stores={stores}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/apply" component={Apply} />
        <Route exact path="/register" component={Register} />
        <Route path="/logout" component={Logout} />
        <Route path="/privacy" component={PrivatePolicy} />
        <Route path="/terms" component={Terms} />
      </Switch>
    </Router>
  </Provider>
);

export default hot(module)(App);
