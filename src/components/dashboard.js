import React from "react"

import {Switch, Route} from "react-router"

import AuthChecker from 'components/utils/auth-checker'

import Header from './dashboard/header'

import Home from './dashboard/home'
import Profile from './dashboard/profile'
import Sessions from './dashboard/sessions'
import Playground from './dashboard/playground'
import ProfileFiller from './dashboard/profile-filler'

class Dashboard extends React.Component {

  render() {

    return (
        <div className="dashboard">
          <Header location={this.props.location} history={this.props.history} showAside={!this.props.me || this.props.me.firstname !== null} />
          {this.props.me && this.props.me.firstname === null
           ? <ProfileFiller me={this.props.me} />
           : <Switch>
               <Route exact path="/dashboard" component={AuthChecker(Home)} />
               <Route exact path="/dashboard/profile" component={AuthChecker(Profile)} />
               <Route exact path="/dashboard/sessions/:identifier" component={AuthChecker(Playground)} />
               <Route exact path="/dashboard/sessions" component={AuthChecker(Sessions)} />
             </Switch>}
        </div>
    );
  }

}

export default Dashboard
