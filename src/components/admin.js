import React from "react"

import {Switch, Route} from "react-router"

import AuthChecker from 'components/utils/auth-checker'
import CheckForAcls from 'components/utils/auth/check-for-acls'

import Header from './admin/header'
import Home from './admin/home'

class Admin extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/admin" component={AuthChecker(CheckForAcls(["admin"], Home))} />
        </Switch>
      </div>
    )
  }

}

export default Admin
