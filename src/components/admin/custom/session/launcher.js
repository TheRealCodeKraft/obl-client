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
    const localState = this.getState()
    return (
      <Grid fluid>
        <Row>
          <Col xs={4}>
            <img src={this.props.entity.game.picture} className="img-rounded" alt={this.props.entity.game.title} />
          </Col>
          <Col xs={8}>
            <span>{localState.message}</span>
            {localState.toProceed
             ? <div>
                 <button onClick={this.handleCancel} className="btn btn-danger">Non</button>
                 <button onClick={this.handleLaunch} className="btn btn-accent">Oui</button>
               </div>
             : null}
          </Col>
        </Row>
      </Grid>
    )
  }

  getState() {
    var state = {
      message: null,
      toProceed: true
    }
    switch(this.props.action) {
      case "launch":
        state.message = <span>Êtes-vous sûr de vouloir <strong>lancer</strong> la session <strong>{this.props.entity.title}</strong> ?</span>
        break
      case "pause":
        if (this.props.entity.current_round.userStates.filter(us => {return us.decision_maker !== null}).length > 0) {
          state.message = <span>Vous ne pouvez pas mettre le jeu en pause : il y a des joueurs qui passent leur entretien actuellement</span>
          state.toProceed = false
        } else {
          state.message = <span>Êtes-vous sûr de vouloir <strong>mettre en pause</strong> la session <strong>{this.props.entity.title}</strong> ?</span>
        }
        break
      case "next-round":
        state.message = <span>Êtes-vous sûr de vouloir <strong>lancer le prochain round</strong> de la session <strong>{this.props.entity.title}</strong></span>
        break
    }
    return state
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
