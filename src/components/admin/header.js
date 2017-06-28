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
        <Link to="/">Open Business Lab</Link>
        <Link to="/dashboard">Dashboard</Link>
        <a href="#" onClick={this.handleLogout}>Déconnexion</a>
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
