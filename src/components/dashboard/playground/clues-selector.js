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
               <p><Button onClick={this.hideLast}>Fermer</Button></p>
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
