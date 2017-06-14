import React from "react"
import { Redirect } from 'react-router-dom'

import Auth from 'clients/auth'

export default function(ComposedComponent, offline=false) {
  class AuthChecker extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        refreshing: false
      }

      this.handleRefresh = this.handleRefresh.bind(this)
    }

    render() {
      if (!offline) {
        if (this.state.refreshing) {
          return <span>Refreshing</span>
        }

        var logStatus = Auth.checkLoggedIn()
        if (!logStatus) {
          return <Redirect to="/login" />
        } else if (logStatus === "toRefresh") {
          this.setState({refreshing: true}, function() {
            Auth.refreshToken(this.handleRefresh)
          })
        }
      } else if (offline && Auth.checkLoggedIn()) {
        return <Redirect to="/dashboard" />
      }
      return <ComposedComponent {...this.props} />
    }

    handleRefresh(data) {
      if (data.error) {
        Auth.logout()
      }
      this.setState({refreshing: false})
    }

  }

  return AuthChecker
}
