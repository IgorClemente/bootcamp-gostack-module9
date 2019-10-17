import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard}></Route>
      <Route path="/login" component={SignIn}></Route>
      <Route path="/register" component={SignUp}></Route>
      <Route path="/profile" component={Profile}></Route>
    </Switch>
  );
}
