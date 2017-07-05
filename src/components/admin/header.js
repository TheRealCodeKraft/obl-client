import React from "react"

import { Link, Redirect } from 'react-router-dom'
import Auth from 'clients/auth'

import ShowForAcls from 'components/utils/auth/show-for-acls'

class Header extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      logout: false
    }

    this.handleLogout = this.handleLogout.bind(this)
  }

  render() {
    if (this.state.logout) return <Redirect to="/" />

    return (
      <header id="header">   
          <nav className={"navbar navbar-default navbar-fixed-top"}>
              <div className={"container-fluid"}>
                  <div className={"navbar-header"}>
                      <div id="mobile-menu">
                          <div className={"left-nav-toggle"}>
                              <a href="#">
                                  <i className={"stroke-hamburgermenu"}></i>
                              </a>
                          </div>
                      </div>
                      <Link to="/" className={"navbar-brand"} style={{background: "#b53c3c"}}>
                          <img src="/assets/images/logo-obl-mini.png" alt="Open Business Labs" /> <span>OBL</span>
                      </Link>
                  </div>
                  <div id="navbar" className={"navbar-collapse collapse"}>
                      <div className={"left-nav-toggle"}>
                          <a href="">
                              <i className={"stroke-hamburgermenu"}></i>
                          </a>
                      </div>
                  </div>
              </div>
          </nav>
          <aside className={"navigation"}>
              <nav>
                  <ul className={"nav luna-nav"}>
                      <li className={"nav-category"}>
                          Navigation
                      </li>
                      <li><Link to="/admin">Admin dashboard</Link></li>
                      <li><Link to="/admin/games">Jeux</Link></li>
                      <li><Link to="/admin/sessions">Sessions</Link></li>
                      <li><Link to="/dashboard">Retour au site</Link></li>
                      <li><a href="#" onClick={this.handleLogout}>Déconnexion</a></li>
                  </ul>
              </nav>
          </aside>

      </header>
    );

  }

  handleLogout(e) {
    e.preventDefault()
    Auth.logout()
    this.setState({logout: true})
  }

}

export default Header
