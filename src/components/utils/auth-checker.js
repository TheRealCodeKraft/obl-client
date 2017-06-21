import React from "react"
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import UserClient from 'clients/user'

import Auth from 'clients/auth'

export default function(ComposedComponent, offline=false) {
  class AuthChecker extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        refreshing: false,
        resetting: false,
        checking: false,
        connectionOk: false
      }

      this.handleRefresh = this.handleRefresh.bind(this)
    }

    componentWillMount() {
      if (Auth.checkForToken() == true) {
        // I HAVE A TOKEN
        if (offline) { 
          // I NEED OFFLINE GRANTS
          this.props.history.push("/dashboard") 
        }
        else { 
          // I NEED ONLINE GRANTS
          if (this.props.me === null) {
            // NOT ME DATA
            this.setState({checking: true}, function () {
              UserClient.me()
            })
          } else {
            // RESETTING ME DATA
            this.setState({resetting: true}, function() {
              UserClient.resetMe()
            })
          }
        }
      } else {
        // I HAVE NO TOKEN
        if (offline) { 
          // I NEED OFFLINE GRANTS
          this.setState({connectionOk: true}) 
        }
        else {
          // I NEED ONLINE GRANTS
          this.props.history.push('/login')
        }
      }
    }

    componentWillReceiveProps(props) {
      if (this.state.resetting && props.me == null) {
        // SESSION HAS BEEN RESET
        this.setState({resetting: false, checking: true}, function() {
          UserClient.me()
        })
      } else if (this.state.checking) {
        // I AM CHECKING FOR ME DATA
        if (props.notFound === false) {
          // I AM LOGGED IN
          this.setState({checking: false, connectionOk: true})
        } else {
          // CONNECTION FAILED
          this.props.history.push("/login")
        }
      }
    }

    render() {
      if (!this.state.connectionOk) {
        return <span>Checking logged in</span>
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

  return connect(mapStateToProps)(AuthChecker)
}

function mapStateToProps(state) {
  return {
    me: state.userState.me,
    notFound: state.userState.notFound || false
  }
}
