import React from "react"
import { connect } from 'react-redux'

import SessionClient from 'clients/session'

import {ActionCable} from 'react-actioncable-provider'

import WaitingRoom from './playground/waiting-room'
import ScenarioSelector from './playground/scenario-selector'
import RoomSelector from './playground/room-selector'
import CluesSelector from './playground/clues-selector'
import VideoGame from './playground/video-game'
import FinalRoom from './playground/final-room'
import GlobalScores from './playground/global-scores'

import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';

class Playground extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      current_session_id: undefined
    }

    this.handleCableReceived = this.handleCableReceived.bind(this)
    this.doPing = this.doPing.bind(this)
  }

  componentDidMount() {
    if (this.props.match.params.identifier !== undefined) {
      this.setState({current_session_id: parseInt(this.props.match.params.identifier)}, function() {
        SessionClient.fetchOne(this.props.match.params.identifier)
      })
    }

    this.startPolling()
  }

  componentWillUnmount() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  render() {
    if (!this.props.session || this.props.session.id !== this.state.current_session_id) return <span>Chargement de la session en cours</span>
    else {
      return (
        <section className="content jeu">

          <ActionCable ref="sessionChannel" channel={{channel: "SessionChannel", session: this.props.session.id}} onReceived={this.handleCableReceived} />

          <Grid fluid>
            <Row>
              <Col xs={12} className="titre-accueil-jeu">
                <Panel className="panel-filled panel-c-warning">
                  <Row>
                    <Col md={9}>
                      <img src={this.props.session.game.picture} className="img-rounded image-lg" alt={this.props.session.game.title} />
                      <h1>{this.props.session.game.title}</h1>
                      <div className="small">{this.props.session.title}</div>
                    </Col>
                    <Col md={3}>
                      <Button href="/dashboard/sessions" className="btn-retour-liste-jeu">Retour à la liste des sessions</Button>
                    </Col>
                  </Row>
                </Panel>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                {this.buildSection()}
              </Col>
            </Row>
          </Grid>

        </section>
      )
    }
  }

  buildSection() {
    var section = null

    switch(this.props.session.playable) {
      case "to_launch":
        section = <div className="alert alert-danger">
                  <h4>Jeu en pause</h4>
                  <p>Attendez que l'animateur lance la session de jeu pour pouvoir commencer.</p>
                  </div>
        break
      case "play":
        switch(this.props.session.current_step) {
          case "waiting_players":
            section = <WaitingRoom session={this.props.session} />
            break
          case "room":
            section = <RoomSelector session={this.props.session} />
            break
          case "scenario":
            section = <ScenarioSelector session={this.props.session} />
            break
          case "clues":
            if (this.currentUserState().decision_maker === null) {
              section = <CluesSelector session={this.props.session} />
            } else if (this.currentUserState().score && this.currentUserState().score.ca) {
              section = <FinalRoom session={this.props.session} />
            } else {
              section = <VideoGame session={this.props.session} me={this.props.me} />
            }
            break
          default:
            break
        }
        break
      case "pause":
        section = <div className="alert alert-danger">
                  <h4>Jeu en pause</h4>
                  <p>Attendez que l'animateur lance la session de jeu pour pouvoir commencer.</p>
                  </div>
        break
      case "stop":
        section = <GlobalScores session={this.props.session} />
        break
      default:
        break
    }

    return section
  }

  startPolling() {
    var self = this;
    setTimeout(function() {
      self.doPing(); // do it once and then start it up ...
      self._timer = setInterval(self.doPing, 15000);
    }, 1000);
  }

  currentUserState() {
    return this.getUserState(this.props.me)
  }

  getUserState(user) {
    return this.props.session.current_round.userStates.filter(state => { return state.user === user.id })[0]
  }

  handleCableReceived(data) {
    if (this.props.session.id === data.session.id) {
      SessionClient.pushInState(data.session)
    }
  }

  doPing() {
    if (this.refs.sessionChannel) {
      this.refs.sessionChannel.perform('ping', {user: this.props.me.id, session: this.props.session.id})
    }
  }

}

function mapStateToProps(state) {
  return {
    me: state.userState.me || null,
    session: state.sessionState.session || null
  }
}

export default connect(mapStateToProps)(Playground)
