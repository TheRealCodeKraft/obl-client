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
console.log(ComposedComponent)
console.log(Auth.checkForToken())
      if (Auth.checkForToken() == true) {
console.log("I HAVE A TOKEN")
console.log(offline)
        if (offline) { console.log("I NEED FOR OFFLINE"); this.props.history.push("/dashboard") }
        else { 
console.log("I NEED FOR ONLINE"); 
          if (this.props.me === null) {
            this.setState({checking: true}, function () {
              UserClient.me()
            })
          } else {
            this.setState({resetting: true}, function() {
console.log("RESETTING")
              UserClient.resetMe()
            })
          }
        }
      } else {
console.log("I HAVE NO TOKEN")
        if (offline) { console.log("I NEED FOR OFFLINE"); this.setState({connectionOk: true}) }
        else {
          console.log("I NEED FOR ONLINE") 
this.props.history.push('/login')
        }
      }
    }

    componentWillReceiveProps(props) {
console.log("PROPSSSS")
console.dir(props)
      if (this.state.resetting && props.me == null) {
        console.log("RESETTED")
        this.setState({resetting: false, checking: true}, function() {
          UserClient.me()
        })
      } else if (this.state.checking) {
        if (props.notFound === false) {
          console.log("LOGGED IN")
          this.setState({checking: false, connectionOk: true})
        } else {
          this.props.history.push("/login")
        }
      } else {
//console.log("REDIRECT")
 //       this.props.history.push("/login")
      }
    }

    render() {
      if (!this.state.connectionOk) {
        return <span>Checking logged in</span>
      }

/*
      if (!offline) {
        if (this.state.refreshing) {
          return <span>Refreshing</span>
        }

        var logStatus = Auth.checkLoggedIn()
        if (!logStatus) {
          return <Redirect to="/login" />
        } else {
          if (logStatus === "toRefresh") {
            this.setState({refreshing: true}, function() {
              Auth.refreshToken(this.handleRefresh)
            })
          }
        }
      } else if (offline && Auth.checkLoggedIn()) {
        return <Redirect to="/dashboard" />
      }
*/

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
console.log("STATE FROM REDUX")
console.dir(state)
  return {
    me: state.userState.me,
    notFound: state.userState.notFound || false
  }
}
