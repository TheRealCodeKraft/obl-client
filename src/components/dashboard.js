import React from "react"

import {Switch, Route} from "react-router"

import UserClient from 'clients/user'

import AuthChecker from 'components/utils/auth-checker'

import Header from './dashboard/header'

import Home from './dashboard/home'
import Profile from './dashboard/profile'
import Sessions from './dashboard/sessions'
import Playground from './dashboard/playground'
import ProfileFiller from './dashboard/profile-filler'

class Dashboard extends React.Component {

  constructor(props) {

    super(props)
    this.state = {}
  }

  componentWillMount() {
    var self = this
    UserClient.me(function(me) {
      if (!me.error) {
        self.setState({me: me})
      }
    })
  }

  render() {

    return (
        <div className="dashboard">
          <Header location={this.props.location} history={this.props.history} showAside={true} />
          {this.state.me && this.state.me.firstname === null
           ? <ProfileFiller me={this.state.me} />
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
