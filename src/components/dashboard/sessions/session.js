import React from "react"
import {Link} from "react-router-dom"
import {Row, Col} from "react-bootstrap"

import SessionClient from 'clients/session'

import {ActionCable} from 'react-actioncable-provider'

var moment = require("moment")

class Session extends React.Component {

  constructor(props) {
    super(props)
    this.handleCableReceived = this.handleCableReceived.bind(this)
  }

  render() {
    var sessionStatus = {}

    switch(this.props.session.playable) {
      case "to_launch":
        sessionStatus.color = "orange"
        sessionStatus.label = "Session à venir"
        break
      case "play":
        sessionStatus.color = "green"
        sessionStatus.label = "Session en cours"
        break
      case "pause":
        sessionStatus.color = "orange"
        sessionStatus.label = "Session en pause"
        break
      case "stop":
        sessionStatus.color = "red"
        sessionStatus.label = "Session terminée"
        break
      default:
        break
    }
    if (!this.props.session || !this.props.session.game) {
      return <span>Chargement de la session en cours</span>
    } else {
      return (
        <Row>
          <Col xs={12}>
            <div className={"panel panel-filled panel-list-jeux panel-c-success"}>
              <Row>
                <Col md={2}>
                  <div className="panel-body">
                    <img src={this.props.session.game.picture} className="img-rounded" alt="vignette-jeu" />
                  </div>
                </Col>
                <Col md={10}>
                  <div className="panel-heading">
                    <h4>{this.props.session.game.title}</h4>
                    <div className="small">{this.props.session.title} - {moment(this.props.session.start_ts).format("DD/MM/YYYY")}</div>
                  </div>
                  <div className="panel-body">
                    <div><mark className={"mark-" + sessionStatus.color}>{sessionStatus.label}</mark></div>
                  </div>
                  {this.props.session.playable === "play"
                   ? <div className="panel-footer">
                       <Link className={"btn btn-success"} to={"/dashboard/sessions/" + this.props.session.id}>Accéder à la salle de jeu</Link>
                     </div>
                   : null}
                  {this.props.session.playable === "stop"
                   ? <div className="panel-footer">
                       <Link className={"btn btn-danger"} to={"/dashboard/sessions/" + this.props.session.id}>Voir les résultats</Link>
                     </div>
                   : null}
                </Col>
              </Row>
            </div>
          </Col>
          <ActionCable ref="sessionChannel" channel={{channel: "SessionChannel", session: this.props.session.id}} onReceived={this.handleCableReceived} />
        </Row>
      )
    }
  }

  handleCableReceived(data) {
    SessionClient.pushInState(data.session)
  }

}

export default Session
