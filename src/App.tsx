import './App.css';

import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import { LoginPage } from './containers/LoginPage';
import { MainPage } from './containers/MainPage';
import PrivateRoute from './containers/PrivateRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact>
          <Redirect to="/main"></Redirect>
        </Route>

        <PrivateRoute path="/main" component={MainPage}></PrivateRoute>

        <Route path="/login" component={LoginPage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
