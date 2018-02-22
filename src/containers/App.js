import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { isLoggedIn } from 'utils/adminAuthentication';

import Authentication from './Authentication';
import Admin from './Admin';
import Homepage from './Homepage';

const App = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={isLoggedIn() ? Admin : Homepage} />
        <Authentication />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default App;