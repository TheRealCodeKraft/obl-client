import React from "react"

import { Route, Switch } from 'react-router-dom'

import Header from './offline/header'
import Home from './offline/home'
import Login from './offline/login'
import Signup from './offline/signup'

import AuthChecker from './utils/auth-checker'

class Offline extends React.Component {

  render() {
    return (
      <div className="offline">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={AuthChecker(Login, true)} />
          <Route exact path="/signup" component={AuthChecker(Signup, true)} />
        </Switch>
      </div>
    );
  }

}

export default Offline;
