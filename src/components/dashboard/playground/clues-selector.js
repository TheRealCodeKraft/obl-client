import React from "react"
import { connect } from 'react-redux'

import { Grid, Row, Col, Table, Button, Alert } from 'react-bootstrap';

import QrScanner from 'components/utils/qr-scanner'
import CluesList from './clues-selector/clues-list'

class CluesSelector extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      checking: false,
      error: false,
      value: "",
      show_last: false,
      last: null
    }

    this.handleQrScan = this.handleQrScan.bind(this)
    this.checkReturn = this.checkReturn.bind(this)

    this.hideLast = this.hideLast.bind(this)
  }

  render() {
    return (
      <div>
        <QrScanner
          title="Flash ici tes cartes business-battle (cartes indices et carte décideur)"
          description="Tu recoltes les cartes indices au cours du jeu de plateau. La carte décideur est celle que tu obtiens à la fin du jeu de plateau."
          error={this.state.error}
          errorMessage={this.state.errorMessage}
          onScan={this.handleQrScan}
          searching={this.state.checking}
        />
        {this.showLast()}
        <hr />
        {/*
        <div style={{border: "1px solid #949ba2", padding: 20}}>
          <h5>[TEMPORAIRE] Codes dispos</h5>
          <div><strong>FINANCIERS</strong> F1BAJL | A2RAZ | E3FAG | R4EAB | J5MAP | P6TAO | Z7YAU | A8AAT | E9PAP</div>
          <div><strong>TECHNIQUES</strong> ZAE1E | M1S1P | P2F1S | J3Z1P | U4M1K | Y5T1N | S6E1Q | C7H1D | R8J1J</div>
          <div><strong>DECISIONS</strong> C9Q1S | QAD2X | J1X2F | X2S2W | P3E2V | X4M2L | C5G2N | S6Y2U</div>
          <div><strong>DECIDEURS</strong> U9C3S MAS4R C1J4A F2N4D</div>
        </div>
        */}
        <h2><i className="pe pe-7s-search text-warning"></i> Indices collectés</h2>
        <CluesList clues={this.currentUserState().clues} />
      </div>
    )
  }
  
  showLast() {
    if (this.state.show_last) {
      return  <Row>
                <Col xs={12}>
                  <Alert bsStyle="success" onDismiss={this.hideLast}>
                    <h4>Nouvel indice récolté</h4>
                     {this.state.last.map(item => {
                       return <p>{item.description}</p>
                     })}
                     <p><Button onClick={this.hideLast} bsStyle="success">Fermer</Button></p>
                  </Alert>
                </Col>
              </Row>
    }
  }

  currentUserState() {
    return this.getUserState(this.props.me)
  }

  getUserState(user) {
    return this.props.session.current_round.userStates.filter(state => { return state.user === user.id })[0]
  }

  handleQrScan(data) {
    this.setState({checking: true, value: data}, function() {
      this.props.clients.SessionClient.checkCode(this.props.session.id, data, this.checkReturn)
    })
  }

  checkReturn(data) {
    if (data.result === "success") {
      this.props.clients.SessionClient.pushInState(data.session)
      this.setState({error: false, checking: false, show_last: true, last: data.item})
    } else {
      var message = "Veuillez utiliser une carte INDICE"
      if (data.message.indexOf("already use") > 0) {
        message = "Tricheur ? Cette carte a déjà été utilisée ..."
      }
      this.setState({error: true, errorMessage: message, checking: false}) 
    }
  }

  hideLast() {
    this.setState({show_last: false, last: null})
  }
}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients,
    me: state.userState.me || null,
  }
}

export default connect(mapStateToProps)(CluesSelector)
