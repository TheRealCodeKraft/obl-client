import React from "react";

import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import Auth from 'clients/auth'

class Header extends React.Component {

  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  render() {

    return (

      <div className="back-link">
            <Link to="/"><img src="assets/images/logo-obl-small.png" alt="Open Business Labs" /></Link>
      </div>

    )
  }

  handleLogout(e) {
    e.preventDefault()
    Auth.logout()
    this.setState({logout: true})
  }

}

function mapStateToProps(state) {
  return {
    me: state.userState.me
  }
}

export default connect(mapStateToProps)(Header)
