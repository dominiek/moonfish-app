
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminLogout from './AdminLogout';
import Apply from './Apply';
import Register from './Register';
import EndSession from './EndSession';

export default () => (
  <Switch>
    <Route path="/login" component={AdminLogin} />
    <Route path="/logout" component={AdminLogout} />
    <Route path="/apply" component={Apply} />
    <Route path="/register" component={Register} />
    <Route path="/end-session" component={EndSession} />
  </Switch>
);
