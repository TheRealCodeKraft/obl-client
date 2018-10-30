import React from "react"

import { connect } from 'react-redux'

import { Grid, Row, Col, Panel } from 'react-bootstrap';

class AlreadyConnected extends React.Component {

  constructor(props) {
    super(props)

    this.handleNext = this.handleNext.bind(this)
  }

  render() {
    return (
      <Grid className="container-center animated slideInDown">
         <Row className="view-header">
          <div className={"header-icon"}>
              <i className={"pe page-header-icon pe-7s-shield"}></i>
          </div>
          <div className={"header-title"}>
              <h3>Pas possible, désolé :^)</h3>
              <small>
                Vous êtes déjà connecté sur la plateforme.
              </small>
          </div>
        </Row>

        <Panel className="panel panel-filled">
          <a className={"btn btn-default btn-play"} onClick={this.handleNext}>Je me déconnecte</a>
        </Panel>

      </Grid>
    )
  }

  handleNext(e) {
    e.preventDefault()
    var self=this
    this.props.clients.ApiClient.logout(function() {
      if (self.props.onLogout) self.props.onLogout()
    })
  }

}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients || {}
  }
}

export default connect(mapStateToProps)(AlreadyConnected)
