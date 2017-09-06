import React from "react"
import { connect } from 'react-redux'

import SessionClient from 'clients/session'

import { Grid, Row, Col, Table, Button, Alert } from 'react-bootstrap';

import QrScanner from 'components/utils/qr-scanner'

class RoomSelector extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      checking: false,
      error: false,
      value: ""
    }

    this.handleQrScan = this.handleQrScan.bind(this)
    this.checkReturn = this.checkReturn.bind(this)

    this.goToScenarii = this.goToScenarii.bind(this)

  }

  render() {
    if (this.roomChosen()) {
      var currentUserState = this.currentUserState() 
      return (
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <h2><i className="pe pe-7s-users text-warning"></i> Joueur ayant rejoint votre salle</h2>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Alert bsStyle="info">
                <h4>En attente</h4>
                <p>Quand tous les joueurs auront rejoint la salle, vous pourrez continuer en cliquant sur "Prêts à jouer".</p>
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Pseudo</th>
                    <th>Prêt</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.session.players.filter(player => { 
                   var state = this.getUserState(player)
                   return state.room && state.room.id === currentUserState.room.id
                  }).map(player => {
                    var state = this.getUserState(player)
                    //if (player.id === this.props.me.id) return null
                    return (
                      <tr>
                        <td>{player.firstname}</td>
                        <td className="statut">
                          {state.room ? <i className="pe pe-7s-check text-success"></i> : null}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
              {(this.props.session.players.length === 1 || this.playersOk()) ? <Button onClick={this.goToScenarii}>Prêts à jouer !</Button> : null}
            </Col>
          </Row>
        </Grid>
      )
    } else {
      return (
        <QrScanner
          title="Flash ici ta carte salle"
          description="La carte salle est la carte que tu as obtenue par tirage au sort."
          error={this.state.error}
          errorMessage={this.state.errorMessage}
          onScan={this.handleQrScan}
          searching={this.state.checking}
        />
      )
    }
  }

  currentUserState() {
    return this.getUserState(this.props.me)
  }

  getUserState(user) {
    return this.props.session.current_round.userStates.filter(state => { return state.user === user.id })[0]
  }

  playersOk() {
    return this.props.session.players.length === this.props.session.players.filter(player => {return this.getUserState(player).room}).length
  }

  roomChosen() {
    return this.currentUserState().room !== null
  }

  handleQrScan(data) {
    this.setState({checking: true, value: data}, function() {
      SessionClient.checkCode(this.props.session.id, data, this.checkReturn)
    })
  }

  checkReturn(data) {
    if (data.result === "success") {
      SessionClient.pushInState(data.session)
      this.setState({error: false, checking: false})
    } else {
      this.setState({error: true, errorMessage: /*data.message*/"Veuillez utiliser une carte SALLE", checking: false}) 
    }
  }

  goToScenarii() {
    SessionClient.scenario(this.props.session.id)
  }

}

function mapStateToProps(state) {
  return {
    me: state.userState.me || null,
  }
}

export default connect(mapStateToProps)(RoomSelector)
