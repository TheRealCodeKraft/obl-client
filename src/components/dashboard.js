import React from "react"

import {Switch, Route} from "react-router"

import Header from './dashboard/header'

import Home from './dashboard/home'
import Profile from './dashboard/profile'
import Sessions from './dashboard/sessions'
import Playground from './dashboard/playground'

class Dashboard extends React.Component {

  render() {
    return (
      <div className="dashboard">
        <Header />
        <Switch>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/dashboard/profile" component={Profile} />
          <Route exact path="/dashboard/sessions/:identifier" component={Playground} />
          <Route exact path="/dashboard/sessions" component={Sessions} />
        </Switch>
      </div>
    );
  }

}

export default Dashboard;
