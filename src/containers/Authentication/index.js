
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminLogout from './AdminLogout';
import Apply from './Apply';

export default () => (
  <Switch>
    <Route path="/login" component={AdminLogin} />
    <Route path="/logout" component={AdminLogout} />
    <Route path="/apply" component={Apply} />
  </Switch>
);
