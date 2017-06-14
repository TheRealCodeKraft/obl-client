import React from "react";

import { Route, Switch } from 'react-router-dom'

import Header from './offline/header';
import Home from './offline/home';
import Login from './offline/login';
import Signup from './offline/signup';

class Offline extends React.Component {

  render() {
    return (
      <div className="home">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </div>
    );
  }

}

export default Offline;
