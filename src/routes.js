import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Products from './pages/Products';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AuthenticatedRoute from './utils/AuthenticatedRoute';
import Fallback from './utils/Fallback';
import PrivateRoute from './utils/PrivateRoute';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthenticatedRoute path="/signin" component={SignIn} />
        <AuthenticatedRoute path="/signup" component={SignUp} />
        <PrivateRoute path="/products" component={Products} />
        <Route component={Fallback} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
