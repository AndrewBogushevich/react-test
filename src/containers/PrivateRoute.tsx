import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { RootState } from '../store';

export default function PrivateRoute({ children, ...rest }: RouteProps) {
  const authToken = useSelector((state: RootState) => state.auth.token);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
