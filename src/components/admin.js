import React from "react"

import {Switch, Route} from "react-router"
import { Link } from "react-router-dom"

import AuthClient from 'clients/auth'
import ActionCableProvider from 'react-actioncable-provider'
import configs from 'config'

import Header from './admin/header'
import Home from './admin/home'

import AdminConfig from 'config/admin-config'
import AdminPage from './admin/utils/admin-page'

import * as Clients from 'clients'

class Admin extends React.Component {

  constructor(props) {
    super(props)

    this.pages = AdminConfig
  }

  componentWillMount() {
    for (var index in this.pages) {
      if (!(this.pages[index].client instanceof Object)) {
        this.pages[index].client = Clients[this.pages[index].client]
      }
    }
  }

  render() {

    const token = AuthClient.getToken().access_token

    return (
      <div>
        <Header location={this.props.location} />
        <section className="content">
          <Switch>
            <Route exact path="/admin" component={Home} />
            {this.pages.map(page => {
              return <Route key={page.route} exact path={page.route} component={AdminPage(page)} />
            })}
          </Switch>
        </section>
      </div>
    )
  }

}

export default Admin
