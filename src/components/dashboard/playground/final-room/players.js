import React from "react"

import Moment from 'react-moment'

import SessionClient from 'clients/session'

import { Grid, Row, Col, Button } from 'react-bootstrap';
import Podium from '../common/podium'

class FinalRoomPlayers extends React.Component {

  constructor(props) {
    super(props)
    this.goToEnd = this.goToEnd.bind(this)
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <h2><i className="pe pe-7s-users text-warning"></i> {this.props.title}</h2>
            <h5>Sessions terminées : {this.finishedPlayersCount()} / {this.props.session.players.length}</h5>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col xs={12}>
            <h4><i className="pe pe-7s-map-marker text-warning"></i> Pour votre table</h4>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Podium round={this.props.session.current_round} room={this.currentUserState().room} scenario={this.currentUserState().scenario} totalsForSession={false} />
          </Col>
        </Row>

        <hr />

        <Row>
          <Col xs={12}>
            <table className="table">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Pseudo</th>
                  <th>Score</th>
                  <th>Temps</th>
                  <th>Chiffre d'affaire</th>
                </tr>
              </thead>
              <tbody>
                {this.getPlayersStates().filter(state => { return state.room.id === this.currentUserState().room.id && state.scenario.id === this.currentUserState().scenario.id }).map(state => {
                  return (
                    <tr style={this.props.me.id === state.player.id ? {borderLeft: "3px solid #1bbf89"} : {}}>
                      <td>{(state.score && state.score.raw) ? state.score.position : "-"}</td>
                      <td>{state.player.firstname}</td>
                      <td>{(state.score && state.score.raw) ? state.score.raw + " pts" : "-"}</td>
                      <td>{(state.score && state.score.session_time) ? <Moment format="mm:ss">{state.score.session_time}</Moment> : "-"}</td>
                      <td>{this.playerHasFinished(state.player) ? ((state.score && state.score.ca && state.score.ca !== 0) ? state.score.ca + "k€" : "-") : "-"}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {this.allPlayersFinished() ? <Button onClick={this.goToEnd}>Voir tous les scores</Button> : null}
          </Col>
        </Row>

        <hr />

        <Row>
          <Col xs={12}>
            <h4><i className="pe pe-7s-map-marker text-warning"></i> Pour votre salle</h4>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Podium round={this.props.session.current_round} room={this.currentUserState().room} totalsForSession={false} />
          </Col>
        </Row>
        <hr />

        <Row>
          <Col xs={12}>
            <table className="table">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Pseudo</th>
                  <th>Score</th>
                  <th>Temps</th>
                  <th>Chiffre d'affaire</th>
                </tr>
              </thead>
              <tbody>
                {this.getPlayersStates().filter(state => { return state.room.id === this.currentUserState().room.id }).map(state => {
                  return (
                    <tr style={this.props.me.id === state.player.id ? {borderLeft: "3px solid #1bbf89"} : {}}>
                      <td>{(state.score && state.score.raw) ? state.score.position : "-"}</td>
                      <td>{state.player.firstname}</td>
                      <td>{(state.score && state.score.raw) ? state.score.raw + " pts" : "-"}</td>
                      <td>{(state.score && state.score.session_time) ? <Moment format="mm:ss">{state.score.session_time}</Moment> : "-"}</td>
                      <td>{this.playerHasFinished(state.player) ? ((state.score && state.score.ca && state.score.ca !== 0) ? state.score.ca + "k€" : "-") : "-"}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {this.allPlayersFinished() ? <Button onClick={this.goToEnd}>Voir tous les scores</Button> : null}
          </Col>
        </Row>
        <hr />

        <Row>
          <Col xs={12}>
            <h4><i className="pe pe-7s-map-marker text-warning"></i> Pour toute la session</h4>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Podium round={this.props.session.current_round} totalsForSession={false} />
          </Col>
        </Row>
        <hr />

        <Row>
          <Col xs={12}>
            <table className="table">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Pseudo</th>
                  <th>Score</th>
                  <th>Temps</th>
                  <th>Chiffre d'affaire</th>
                </tr>
              </thead>
              <tbody>
                {this.getPlayersStates().map(state => {
                  return (
                    <tr style={this.props.me.id === state.player.id ? {borderLeft: "3px solid #1bbf89"} : {}}>
                      <td>{(state.score && state.score.raw) ? state.score.position : "-"}</td>
                      <td>{state.player.firstname}</td>
                      <td>{(state.score && state.score.raw) ? state.score.raw + " pts" : "-"}</td>
                      <td>{(state.score && state.score.session_time) ? <Moment format="mm:ss">{state.score.session_time}</Moment> : "-"}</td>
                      <td>{this.playerHasFinished(state.player) ? ((state.score && state.score.ca && state.score.ca !== 0) ? state.score.ca + "k€" : "-") : "-"}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {this.allPlayersFinished() ? <Button onClick={this.goToEnd}>Voir tous les scores</Button> : null}
          </Col>
        </Row>
      </Grid>
    )
  }

  getPlayersStates() {
    return this.props.session.current_round.userStates.sort(function(a, b) {
      if (a.score === null) return 1
      else if (b.score === null) return -1
      else return (a.score.position < b.score.position) ? -1 : 1;
    })
  }

  finishedPlayersCount() {
    return this.props.session.current_round.userStates.filter(state => { return state.score !== null }).length
  }

  playerHasFinished(player) {
    return this.props.session.current_round.userStates.filter(state => { return state.user === player.id && state.score !== null }).length === 1
  }

  allPlayersFinished() {
    return this.finishedPlayersCount === this.props.session.current_round.userStates.length
  }

  currentUserState() {
    return this.getUserState(this.props.me)
  }

  getUserState(user) {
    return this.props.session.current_round.userStates.filter(state => { return state.user === user.id })[0]
  }

  goToEnd() {
    SessionClient.end(this.props.session.id)
  }

}

export default FinalRoomPlayers
