import React from 'react';
import { Link, Redirect, Switch, useRouteMatch } from 'react-router-dom';

import { DashboardPage } from './DashboardPage';
import PrivateRoute from './PrivateRoute';
import { UserListPage } from './UserListPage';
import { UserDetailsPage } from './UserDetailsPage';

export function MainPage() {
  let { path, url } = useRouteMatch();

  return (
    <div className="main-page">
      <nav>
        <Link to={`${url}/dashboard`}>dashboard</Link>|
        <Link to={`${url}/users`}>users</Link>
      </nav>

      <Switch>
        <PrivateRoute exact path={path}>
          <Redirect to={`${path}/dashboard`}></Redirect>
        </PrivateRoute>

        <PrivateRoute path={`${path}/dashboard`}>
          <DashboardPage></DashboardPage>
        </PrivateRoute>

        <PrivateRoute path={`${path}/users`}>
          <UserListPage></UserListPage>
        </PrivateRoute>

        <PrivateRoute path={`${path}/user/:userId`}>
          <UserDetailsPage></UserDetailsPage>
        </PrivateRoute>
      </Switch>
    </div>
  );
}
