import React from "react"
import { connect } from 'react-redux'

import withUserAgent from 'react-useragent'

import { Grid, Row, Col, Button, Panel} from 'react-bootstrap';

import Chrono from '../../dashboard/playground/video-game/chrono'

class VideoGame extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      running: true,
      finished: false,
      timeout: false,
      scores: {}
    }

    this.runGame = this.runGame.bind(this)
    this.handleChronoEnd = this.handleChronoEnd.bind(this)
    this.goToNextAfterTimeout = this.goToNextAfterTimeout.bind(this)
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
    if (this.state.finished) {
      return (
        <Grid className="container-center animated slideInDown">
           <Row className="view-header">
            <div className={"header-icon"}>
                <i className={"pe page-header-icon pe-7s-gleam"}></i>
            </div>
            <div className={"header-title"}>
                <h3>
                  {this.state.timeout
                   ? "Temps écoulé"
                   : "Calcul du score"}
                </h3>
                <small>
                  {this.state.timeout
                   ? "Vous n'avez pas été assez rapide"
                   : "La partie est terminée"}
                </small>
            </div>
          </Row>

          <Panel className="panel panel-filled" style={{textAlign: "center"}}>
            {this.state.timeout
             ? <Button className="btn-warning" onClick={this.goToNextAfterTimeout}>Continuer</Button>
             : <span>Nous calculons votre score</span>}
          </Panel>
       
        </Grid>
      )
    } else {
      return (
        <Grid fluid>
          <Row>
            {this.props.ua.mobile
             ? <Col xs={12}>
                 <div className="alert alert-danger">
                   <h4>Resource indisponible sur mobile</h4>
                   <p>Ce mode de simulation n'est, à ce jour, pas compatible sur mobile.</p>
                   <p>Merci d'accéder à ce module sur PC/MAC fixe ou portable.</p>
                 </div>
               </Col>
             : <Col xs={12}>
                  <iframe id="video-game-content" 
                    frameborder="0" 
                    style={{visibility: this.state.running ? "visible" : "hidden"}}
                    src={this.getUrl()}
                    width="100%"
                    height="100%"
                  ></iframe>
                  {this.state.running
                   ? <Chrono initial={this.currentUserState().scenario.chrono} onEnd={this.handleChronoEnd} />
                   : null}
               </Col>
            }
          </Row>
        </Grid>
      )
    }
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

  runGame() {
    this.setState({running: true}, function() {
    })
  }

  endGame() {
    var self=this
    this.setState({finished: true}, function() {
      this.props.clients.SessionClient.setUserScores(this.props.session.id, this.props.me.id, this.state.scores, function() {
        self.setState({running: false})
      })
    })
  }

  handleChronoEnd() {
    var self = this
    this.props.clients.SessionClient.setUserScores(this.props.session.id, this.props.me.id, this.state.scores, function() {
      self.setState({finished: true, timeout: true})
    })
  }

  goToNextAfterTimeout() {
    this.setState({running: false})
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
    clients: state.bootstrap.clients,
  }
}

export default withUserAgent(connect(mapStateToProps)(VideoGame))
