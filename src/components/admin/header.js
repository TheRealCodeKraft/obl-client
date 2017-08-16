import React from "react"

import { NavLink, Link, Redirect } from 'react-router-dom'
import Auth from 'clients/auth'

import { Navbar } from 'react-bootstrap';

class Header extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      logout: false,
      menu: false
    }

    this.handleLogout = this.handleLogout.bind(this)
    this.handleHamburgerClick = this.handleHamburgerClick.bind(this)
  }

  render() {
    if (this.state.logout) return <Redirect to="/" />

    return (
      <header id="header">   
          <Navbar fixedTop fluid>
                  <Navbar.Header>
                      <div id="mobile-menu">
                          <div className={"left-nav-toggle"}>
                              <a href="#" onClick={this.handleHamburgerClick}>
                                  <i className={"stroke-hamburgermenu"}></i>
                              </a>
                          </div>
                      </div>
                      <Link to="/" className={"navbar-brand navbar-admin"}>
                          <img src="/assets/images/logo-obl-mini.png" alt="Open Business Labs" /> <span>OBL</span>
                      </Link>
                  </Navbar.Header>
                  <Navbar.Collapse id="navbar">
                      <div className={"left-nav-toggle"}>
                          <a href="#" onClick={this.handleHamburgerClick}>
                              <i className={"stroke-hamburgermenu"}></i>
                          </a>
                      </div>
                  </Navbar.Collapse>
          </Navbar>
          <aside className={"navigation"}>
              <nav>
                  <ul className={"nav luna-nav"}>
                      <li className={"nav-category"}>
                          Navigation
                      </li>
                      <li className={this.props.location.pathname === "/admin" ? "active" : ""}>
                        <NavLink exact to="/admin">Tableau de bord</NavLink>
                      </li>
                      <li className={this.props.location.pathname === "/admin/users" ? "active" : ""}>
                        <NavLink exact to="/admin/users">Utilisateurs</NavLink>
                      </li>
                      <li className={this.props.location.pathname === "/admin/games" ? "active" : ""}>
                        <NavLink exact to="/admin/games">Jeux</NavLink>
                      </li>
                      <li className={this.props.location.pathname === "/admin/scenarios" ? "active" : ""}>
                        <NavLink exact to="/admin/scenarios">Scenarii</NavLink>
                      </li>
                      <li className={this.props.location.pathname === "/admin/clues" ? "active" : ""}>
                        <NavLink exact to="/admin/clues">Indices</NavLink>
                      </li>
                      <li className={this.props.location.pathname === "/admin/sessions" ? "active" : ""}>
                        <NavLink exact to="/admin/sessions">Sessions</NavLink>
                      </li>
                      <li className={this.props.location.pathname === "/admin/rooms" ? "active" : ""}>
                        <NavLink exact to="/admin/rooms">Salles</NavLink>
                      </li>
                      <li><NavLink exact to="/dashboard">Retour au site</NavLink></li>
                      <li><a href="#" onClick={this.handleLogout}>Déconnexion</a></li>
                  </ul>
              </nav>
          </aside>

      </header>
    );

  }

  handleHamburgerClick(e) {
    e.preventDefault()
    this.setState({menu: !this.state.menu}, function() {
      if (this.state.menu) {
        document.body.className += " nav-toggle"
      } else {
        document.body.className -= " nav-toggle"
      }
    })
  }

  handleLogout(e) {
    e.preventDefault()
    Auth.logout()
    this.setState({logout: true})
  }

}

export default Header
