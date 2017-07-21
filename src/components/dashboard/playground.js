import React from "react"
import { connect } from 'react-redux'

import SessionClient from 'clients/session'

import {ActionCable} from 'react-actioncable-provider'

import WaitingRoom from './playground/waiting-room'

import { Grid, Row, Col, Panel } from 'react-bootstrap';

class Playground extends React.Component {

  constructor(props) {
    super(props)

    this.handleCableReceived = this.handleCableReceived.bind(this)
    this.doPing = this.doPing.bind(this)
  }

  componentDidMount() {
    if (this.props.match.params.identifier != undefined) {
      SessionClient.fetchOne(this.props.match.params.identifier)
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
    if (!this.props.session) {

      return <span>Chargement de la session en cours</span>

    } else {

      return (
        <section className="content">

          <ActionCable ref="sessionChannel" channel={{channel: "SessionChannel", session: this.props.session.id}} onReceived={this.handleCableReceived} />

          <Grid fluid>
            <Row>
              <Col xs={12} className="titre-accueil-jeu">
                <Panel className="panel-filled panel-c-warning">
                  <Row>
                    <Col md={2}>
                      <img src={this.props.session.game.picture} className="img-rounded" alt={this.props.session.game.title} />
                    </Col>
                    <Col md={10}>
                      <h1>{this.props.session.game.title}</h1>
                      <div className="small">{this.props.session.title}</div>
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
        section = <span>[TODO] Jeu en attente de lancement [TODO]</span>
        break
      case "play":
        switch(this.props.session.current_step) {
          case "waiting_players":
            section = <WaitingRoom session={this.props.session} />
            break
        }
        break
      case "pause":
        section = <span>[TODO] Jeu en pause [TODO]</span>
        break
      case "stop":
        section = <span>[TODO] Jeu terminé [TODO]</span>
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

  handleCableReceived(data) {
    SessionClient.pushInState(data.session)
  }

  doPing() {
    this.refs.sessionChannel.perform('ping', {user: this.props.me.id, session: this.props.session.id})
  }

}

function mapStateToProps(state) {
  return {
    me: state.userState.me || null,
    session: state.sessionState.session || null
  }
}

export default connect(mapStateToProps)(Playground)
