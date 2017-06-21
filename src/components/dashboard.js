import React from "react"

import {Switch, Route} from "react-router"

import AuthChecker from 'components/utils/auth-checker'

import Header from './dashboard/header'

import Home from './dashboard/home'
import Profile from './dashboard/profile'
import Games from './dashboard/games'

class Dashboard extends React.Component {

  render() {
    return (
      <div className="dashboard">
        <Header />
        <Switch>
          <Route exact path="/dashboard" component={AuthChecker(Home)} />
          <Route exact path="/dashboard/profile" component={AuthChecker(Profile)} />
          <Route exact path="/dashboard/games" component={AuthChecker(Games)} />
        </Switch>
      </div>
    );
  }

}

export default Dashboard;
