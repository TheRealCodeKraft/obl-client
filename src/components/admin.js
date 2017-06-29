import React from "react"

import {Switch, Route} from "react-router"
import { Link } from "react-router-dom"

import Header from './admin/header'
import Home from './admin/home'

import AdminConfig from 'config/admin-config'
import AdminPage from './admin/utils/admin-page'

import * as Clients from 'clients'

class Admin extends React.Component {

  constructor(props) {
    super(props)

    this.pages = AdminConfig
    for (var index in this.pages) {
      this.pages[index].client = Clients[this.pages[index].client]
    }

  }

  render() {
    return (
      <div>
        <Header />
        <div style={{display: "flex", width: "100%"}}>
          <div style={{display: "flex", flexDirection: "column", paddingRight: 20, marginRight: 20, borderRight: "1px solid lightgray"}}>
            <h2>Sidebar</h2>
            <Link to="/admin">Racine admin</Link>
            <Link to="/admin/games">Jeux</Link>
            <Link to="/admin/sessions">Sessions</Link>
          </div>
          <div style={{flex: 1, marginRight: 20}}>
            <Switch>
              <Route exact path="/admin" component={Home} />
              {this.pages.map(page => {
                return <Route key={page.route} exact path={page.route} component={AdminPage(page)} />
              })}
            </Switch>
          </div>
        </div>
      </div>
    )
  }

}

export default Admin
