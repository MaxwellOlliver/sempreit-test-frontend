import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isAuthenticated from './isAuthenticated';

const AuthenticatedRoute = ({ component: Component, ...aProps }) => {
  return (
    <Route
      {...aProps}
      render={(props) =>
        !isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/products', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default AuthenticatedRoute;
