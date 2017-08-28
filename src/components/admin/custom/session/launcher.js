import React from "react"

import {Grid, Col, Row} from "react-bootstrap"

class SessionLauncher extends React.Component {

  constructor(props) {
    super()

    this.handleLaunch = this.handleLaunch.bind(this)
    this.handleLaunched = this.handleLaunched.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={4}>
            <img src={this.props.entity.game.picture} className="img-rounded" alt={this.props.entity.game.title} />
          </Col>
          <Col xs={8}>
            <span>{this.getMessage()}</span>
            <div>
              <button onClick={this.handleCancel} className="btn btn-danger">Non</button>
              <button onClick={this.handleLaunch} className="btn btn-accent">Oui</button>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }

  getMessage() {
    var message = null
    switch(this.props.action) {
      case "launch":
        message = <span>Êtes-vous sûr de vouloir <strong>lancer</strong> la session <strong>{this.props.entity.title}</strong> ?</span>
        break
      case "pause":
        message = <span>Êtes-vous sûr de vouloir <strong>mettre en pause</strong> la session <strong>{this.props.entity.title}</strong> ?</span>
        break
      case "next-round":
        message = <span>Êtes-vous sûr de vouloir <strong>lancer le prochain round</strong> de la session <strong>{this.props.entity.title}</strong></span>
        break
    }
    return message
  }

  handleLaunch() {
    this.setState({launching: true}, function() {
      switch(this.props.action) {
        case "launch":
          this.props.client.launch(this.props.entity.id, this.handleLaunched)
          break
        case "pause":
          this.props.client.pause(this.props.entity.id, this.handleLaunched)
          break
        case "next-round":
          this.props.client.nextRound(this.props.entity.id, this.handleLaunched)
          break
      }
    })
  }

  handleCancel() {

  }

  handleLaunched(data) {
    this.setState({launching: false}, function() {
      if (this.props.onFinished) this.props.onFinished(data)
    })
  }

}

export default SessionLauncher
