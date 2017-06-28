import React from "react"

import {Switch, Route} from "react-router"
import { Link } from "react-router-dom"


import Header from './admin/header'
import Home from './admin/home'
import Games from "./admin/games"

class Admin extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <div style={{display: "flex"}}>
          <div style={{display: "flex", flexDirection: "column"}}>
            <h2>Sidebar</h2>
            <Link to="/admin">Racine admin</Link>
            <Link to="/admin/games">Jeux</Link>
            <Link to="/admin/sessions">Sessions</Link>
          </div>
          <div>
            <Switch>
              <Route exact path="/admin" component={Home} />
              <Route exact path="/admin/games" component={Games} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }

}

export default Admin
