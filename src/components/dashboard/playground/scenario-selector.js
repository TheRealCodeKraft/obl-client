import React from "react"
import { connect } from 'react-redux'

import SessionClient from 'clients/session'

import { Grid, Row, Col, Table, Button } from 'react-bootstrap';

import QrScanner from 'components/utils/qr-scanner'

class ScenarioSelector extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      checking: false,
      error: false,
      value: ""
    }

    this.handleQrScan = this.handleQrScan.bind(this)
    this.checkReturn = this.checkReturn.bind(this)
    this.goToOpportunity = this.goToOpportunity.bind(this)
  }

  render() {
    if (this.scenarioChosen()) {
      var currentUserState = this.currentUserState() 
      return (
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <h2><i className="pe pe-7s-users text-warning"></i> Joueurs ayant choisi leur scénario</h2>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Pseudo</th>
                    <th>Scenario</th>
                    <th>Prêt</th>
                  </tr>
                </thead>
                <tbody>
                  {/*this.props.session.players.filter(player => { 
                     var state = this.getUserState(player)
                     return state.scenario && state.scenario.id === currentUserState.scenario.id
                    })*/}
                  {this.props.session.players.map(player => {
                     var state = this.getUserState(player)
                     //if (player.id === this.props.me.id) return null
                     return (
                       <tr>
                         <td>{player.firstname}</td>
                         <td>{state.scenario ? state.scenario.name : ""}</td>
                         <td className="statut">
                           {state.scenario ? <i className="pe pe-7s-check text-success"></i> : null}
                         </td>
                       </tr>
                     )
                  })}
                </tbody>
              </Table>
              {this.playersConnected() ? <Button onClick={this.goToOpportunity}>Prêts à jouer !</Button> : null}
            </Col>
          </Row>
        </Grid>
      )
    } else {
      return (
        <QrScanner
          title="Flash ici ta carte scenario"
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

  playersConnected() {
    return this.props.session.players.length === this.props.session.current_round.userStates.filter(state => { return state.scenario !== null }).length
  }

  scenarioChosen() {
    return this.currentUserState().scenario !== null
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
      this.setState({error: true, errorMessage: /*data.message*/"Veuillez utiliser une carte SCENARIO", checking: false}) 
    }
  }

  goToOpportunity() {
    SessionClient.opportunity(this.props.session.id)
  }
}

function mapStateToProps(state) {
  return {
    me: state.userState.me || null,
  }
}

export default connect(mapStateToProps)(ScenarioSelector)
