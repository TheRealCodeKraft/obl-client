import React from "react"

import { connect } from 'react-redux'

import { Grid, Row, Col, Panel } from 'react-bootstrap';

import VideoGame from '../../dashboard/playground/video-game'

class Fight extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      running: true,
      finished: false
    }

    this.handleNext = this.handleNext.bind(this)
  }

  componentWillMount() {
    var self = this;
    window.API_1484_11 = {
      Initialize: function() {
        self.setState({scores: {}})
        return "true";
      },
      SetValue: function(key, value) {
        var scores = self.state.scores
        fillHash(scores, key.split('.'), value)
        self.setState({scores: scores})
        return "true"
      },
      GetValue: function(parameter) {
        return "value";
      },
      Commit: function(value) {
        self.endGame()
        return "true";
      },
      Terminate: function(value) {
        return "true";
      },
      GetLastError: function() {
        return 0;
      },
      GetErrorString: function(code) {
        return "Error string";
      },
      GetDiagnostic: function(code) {
        return "Diagnostic";
      }
    }
  }

  componentWillUnmount() {
    window.API_1484_11 = undefined
  }

  render() {
    return (
      <iframe id="video-game-content" 
        frameborder="0" 
        src={this.getUrl()}
        width="100%"
        height="100%"
        style={{position: "fixed", top: 0, bottom: 0, left: 0, right: 0}}
      ></iframe>
    )
  }

  getUrl() {
    var url = ""
    url = this.currentUserState().scenario.game_url
    return url
  }

  currentUserState() {
    return this.getUserState(this.props.me)
  }

  getUserState(user) {
    return this.props.session.current_round.userStates.filter(state => { return state.user === user.id })[0]
  }

  getUrl() {
    var url = ""
    url = this.currentUserState().scenario.game_url
    return url
  }

  currentUserState() {
    return this.getUserState(this.props.me)
  }

  getUserState(user) {
    return this.props.session.current_round.userStates.filter(state => { return state.user === user.id })[0]
  }

  endGame() {
    var self=this
    this.setState({finished: true}, function() {
      this.props.clients.SessionClient.setUserScores(this.props.session.id, this.props.me.id, this.state.scores, function() {
        self.setState({running: false})
      })
    })
  }

  handleNext(e) {
    e.preventDefault()
    if (this.props.onNext) this.props.onNext()
  }

}

function fillHash(hash, address, value) {
  if (address.length === 1) {
    hash[address[0]] = value
    return true
  } else {
    if (!hash[address[0]]) {
      hash[address[0]] = {}
    }

    hash = hash[address[0]]
    address.shift()
    return fillHash(hash, address, value)
  }
}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients
  }
}

export default connect(mapStateToProps)(Fight)
