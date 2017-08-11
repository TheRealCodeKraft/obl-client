import React from "react"
import { connect } from 'react-redux'

import SessionClient from 'clients/session'

import { Grid, Row, Col, Table, Button } from 'react-bootstrap';

import QrScanner from 'components/utils/qr-scanner'

class CluesSelector extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      checking: false,
      error: false,
      value: ""
    }

    this.handleQrScan = this.handleQrScan.bind(this)
    this.checkReturn = this.checkReturn.bind(this)
  }

  render() {
    return (
      <QrScanner
        title="Flash ici tes cartes indice"
        error={this.state.error}
        errorMessage={this.state.errorMessage}
        onScan={this.handleQrScan}
        searching={this.state.checking}
      />
    )
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
      this.setState({error: false, checking: false})
    } else {
      this.setState({error: true, errorMessage: /*data.message*/"Veuillez utiliser une carte INDICE", checking: false}) 
    }
  }
}

function mapStateToProps(state) {
  return {
    me: state.userState.me || null,
  }
}

export default connect(mapStateToProps)(CluesSelector)
