import React from "react"

import { connect } from 'react-redux'
import {ActionCable} from 'react-actioncable-provider'

import Loading from './speed-battle/loading'
import WaitingSession from './speed-battle/waiting-session'
import AlreadyConnected from './speed-battle/already-connected'
import Connexion from './speed-battle/connexion'
import Home from './speed-battle/home'
import Fight from './speed-battle/fight'
import Scores from './speed-battle/scores'

import SpeedAdmin from './speed-battle/admin'



class SpeedBattle extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      step: "home",
      loading: false
    }

    this.handleLogout = this.handleLogout.bind(this)
    this.handleNext = this.handleNext.bind(this)

    this.handleCableReceived = this.handleCableReceived.bind(this)
  }

  componentWillReceiveProps(props) {
    // console.log("loading session ?")
    // console.log(props.me)
    // console.log(props.me ? props.me.robot : "NOPE")
    // console.log(this.state.loadingSession)
    // console.log(this.props.session)

    //permet de logger le robot automatiquement
    if (!this.state.loadingSession && props.me && props.me.robot && !this.props.session) {
      console.log("load session")
      var self=this
      this.setState({loadingSession: true}, function() {
        this.props.clients.SessionClient.loadRobotSession(function(data) {
          if (data.error) {
            self.props.clients.ApiClient.logout()
            self.props.clients.SessionClient.pushInState(null)
          } else {
            self.setState({loading: false, loadingSession: false})
          }
        })
      })
    }
  }

  render() {
    const ok = !this.props.me || this.props.me.robot
    if (this.props.me && this.state.loadingSession) {
      return <Loading />
    } else {
      if (this.props.session && !this.props.session.error) {
        var component = null
        if (this.props.me.role == "admin") component = <SpeedAdmin session={this.props.session} />
        else {
          switch(this.props.session.current_step) {
            case "sleeping":
            case "to_launch":
              component = <WaitingSession />
              break
            case "waiting_players":
            case "room":
              component = <Home session={this.props.session} me={this.props.me} />
              break
            case "clues":
              if (this.currentUserState().score && this.currentUserState().score.raw !== null) {
                component = <Scores session={this.props.session} me={this.props.me} />
              } else {
                component = <Fight session={this.props.session} me={this.props.me} />
              }
              break
            case "end":
              component = <Scores onNext={this.handleNext} session={this.props.session} me={this.props.me} finished={true} />
              break
          }
        }
        return (
          <div>
            <ActionCable channel={{channel: "SessionChannel", session: this.props.session.id}} onReceived={this.handleCableReceived} />
            {component}
          </div>
        )
      } else {
        return (
          <div>
            {!ok ? <AlreadyConnected onLogout={this.handleLogout} /> : null}
            {!this.props.me                                      ? <Connexion onNext={this.handleNext} />      : null}
          </div>
        )
      }
    }
  }

  currentUserState() {
    return this.getUserState(this.props.me)
  }

  getUserState(user) {
    return this.props.session.current_round.userStates.filter(state => { return state.user === user.id })[0]
  }

  handleLogout() {
    this.setState({step: "connexion"})
  }

  handleNext() {
    var nextStep = ""
    switch(this.state.step) {
      case "home":
        nextStep="explanations"
        break
      case "explanations":
        nextStep="fight"
        break
      case "fight":
        nextStep="scores"
        break
      case "scores":
        nextStep="home"
        break;
    }
    this.setState({step: nextStep})
  }

  handleCableReceived(data) {
    if (this.props.session.id === data.session.id) {
      this.props.clients.SessionClient.pushInState(data.session)
    }
  }
}

function mapStateToProps(state) {
  return {
    me: state.userState.me || null,
    // me permet de réccupérer l'utilisateur courant
    clients: state.bootstrap.clients || {},
    // permet de réccupérer tous les clients d'API
    session: state.sessionState.session || null,
    // permet d'avoir la session courante
  }
}

export default connect(mapStateToProps)(SpeedBattle)
