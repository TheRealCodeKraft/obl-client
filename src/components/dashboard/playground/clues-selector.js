import React from "react"
import { connect } from 'react-redux'

import SessionClient from 'clients/session'

import { Grid, Row, Col, Table, Button } from 'react-bootstrap';

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
          title="Flash ici tes cartes indice"
          error={this.state.error}
          errorMessage={this.state.errorMessage}
          onScan={this.handleQrScan}
          searching={this.state.checking}
        />
        {this.showLast()}
        <hr />
        <div style={{border: "1px solid #949ba2", padding: 20}}>
          <h5>[TEMPORAIRE] Codes dispos</h5>
          <div><strong>FINANCIERS</strong> F1BAJL | A2RAZ | E3FAG | R4EAB | J5MAP | P6TAO | Z7YAU | A8AAT | E9PAP</div>
          <div><strong>TECHNIQUES</strong> ZAE1E | M1S1P | P2F1S | J3Z1P | U4M1K | Y5T1N | S6E1Q | C7H1D | R8J1J</div>
          <div><strong>DECISIONS</strong> C9Q1S | QAD2X | J1X2F | X2S2W | P3E2V | X4M2L | C5G2N | S6Y2U</div>
          <div><strong>DECIDEURS</strong> U9C3S MAS4R C1J4A F2N4D</div>
        </div>
        <h2><i className="pe pe-7s-search text-warning"></i> Indices collectés</h2>
        <CluesList clues={this.currentUserState().clues} />
      </div>
    )
  }
  
  showLast() {
    if (this.state.show_last) {
      return <div className="alert alert-success">
               <h4>Dernier indice trouvé :</h4>
               {this.state.last.map(item => {
                 return <p>{item.description}</p>
               })}
               <p><Button onClick={this.hideLast} className={"btn btn-success"}>Fermer</Button></p>
             </div>
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
      SessionClient.checkCode(this.props.session.id, data, this.checkReturn)
    })
  }

  checkReturn(data) {
    if (data.result === "success") {
      SessionClient.pushInState(data.session)
      this.setState({error: false, checking: false, show_last: true, last: data.item})
    } else {
      this.setState({error: true, errorMessage: /*data.message*/"Veuillez utiliser une carte INDICE", checking: false}) 
    }
  }

  hideLast() {
    this.setState({show_last: false, last: null})
  }
}

function mapStateToProps(state) {
  return {
    me: state.userState.me || null,
  }
}

export default connect(mapStateToProps)(CluesSelector)
