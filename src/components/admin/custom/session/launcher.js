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
            <img src={this.props.entity.game.picture} className="img-rounded" />
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
    var message = <span>Êtes-vous sûr de vouloir <strong>lancer</strong> la session <strong>{this.props.entity.title}</strong> ?</span>
    if (this.props.entity.playable === "play") {
      message = <span>Êtes-vous sûr de vouloir <strong>mettre en pause</strong> la session <strong>{this.props.entity.title}</strong> ?</span>
    }
    return message
  }

  handleLaunch() {
    this.setState({launching: true}, function() {
      if (this.props.entity.playable == "play") {
        this.props.client.pause(this.props.entity.id, this.handleLaunched)
      } else {
        this.props.client.launch(this.props.entity.id, this.handleLaunched)
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
