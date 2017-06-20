import React from "react";

import { Link, Redirect } from 'react-router-dom'
import Auth from 'clients/auth'

class Header extends React.Component {

  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  render() {

    return (
      <header id="header">
        <Link to="/">Open Business Lab</Link>
        {Auth.checkLoggedIn() 
         ? [<Link to="/dashboard">Dashboard</Link>,
            <a href="#" onClick={this.handleLogout}>Déconnexion</a>]
         : [<Link to="/login">Connexion</Link>,
            <Link to="/signup">Inscription</Link>]
        }
      </header>
    )
  }

  handleLogout(e) {
    e.preventDefault()
    Auth.logout()
    this.setState({logout: true})
  }

}

export default Header;