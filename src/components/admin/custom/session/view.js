import React from "react"

import Moment from 'react-moment'

import { Grid, Row, Col, Table, Button } from 'react-bootstrap'

import Podium from 'components/dashboard/playground/common/podium'

class SessionView extends React.Component {

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h2>{this.props.entity.title}</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <h4>Session <strong>{this.getStatus()}</strong></h4>
          </Col>
        </Row>
        <hr style={{borderColor: "#636363", marginBottom: 40}} />
        <Row>
          <Col xs={12}>
            <Podium round={this.props.entity.rounds.length === 1 ? this.props.entity.current_round : this.props.entity.rounds[this.props.entity.rounds.length - 2]} showTotals={true} />
            <Podium session={this.props.entity} />
          </Col>
        </Row>
        <hr style={{borderColor: "#636363", marginBottom: 40}} />
        <Row>
          <Col xs={12}>
                <table className="table">
                  <thead>
                    <tr>
                      <th rowSpan="2">Position</th>
                      <th rowSpan="2">Pseudo</th>
                      <th rowSpan="2">Salle</th>
                      {this.props.entity.rounds.map((round, index) => {
                        return <th colSpan="3">Round {index+1}</th>
                        return <th colSpan={round.id === this.props.entity.current_round.id ? 4 : 3}>Round {index+1}</th>
                      })}
                      <th colSpan="3">GLOBAL</th>
                    </tr>
                    <tr>
                      {this.props.entity.rounds.map((round, index) => {
                        var cols = []

                        if (round.id === this.props.entity.current_round.id) {
                          cols.push(<th>Scenario</th>)
                        }

                        cols.push(<th>Score</th>)
                        cols.push(<th>Temps</th>)
                        cols.push(<th>Chiffre d'affaire</th>)
                        return cols
                      })}
                      <th>Score</th>
                      <th>Temps</th>
                      <th>Chiffre d'affaire</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.getUserStates().map(state => {
                      return (
                        <tr>
                          <td>{state.score ? state.score.total_position : "-"}</td>
                          <td>{state.player.firstname}</td>
                          <td>{state.room ? state.room.name : "-"}</td>
                          {this.props.entity.rounds.map((round, index) => {
                            var roundState = round.userStates.filter(st => {return st.user === state.user})[0]

                            var cols = []
                            if (round.id === this.props.entity.current_round.id) {
                              cols.push(<td>{roundState.scenario ? state.scenario.name : "-"}</td>)
                            }
                            cols.push(<td>{roundState.score ? roundState.score.raw + " pts" : "-"}</td>)
                            cols.push(<td>{roundState.score ? <Moment format="mm:ss">{roundState.score.session_time}</Moment> : "-"}</td>)
                            cols.push(<td>{(!roundState.score || roundState.score.ca === 0) ? "-" : roundState.score.ca + "k€"}</td>)
                            return cols
                          })}
                          <td>{state.score ? state.score.total_raw + " pts" : "-"}</td>
                          <td>{state.score ? <Moment format="mm:ss">{state.score.total_session_time}</Moment> : "-"}</td>
                          <td>{(!state.score || state.score.total_ca === 0) ? "-" : state.score.total_ca + "k€"}</td>
                            cols.push(<td>{(roundState.score && roundState.score.raw) ? roundState.score.raw + " pts" : "-"}</td>)
                            cols.push(<td>{(roundState.score && roundState.score.session_time) ? <Moment format="mm:ss">{roundState.score.session_time}</Moment> : "-"}</td>)
                            cols.push(<td>{(roundState.score && roundState.score.ca) ? roundState.score.ca + "k€" : "-"}</td>)
                            return cols
                          })}
                          <td>{(state.score && state.score.total_raw) ? state.score.total_raw + " pts" : "-"}</td>
                          <td>{(state.score && state.score.total_session_time) ? <Moment format="mm:ss">{state.score.total_session_time}</Moment> : "-"}</td>
                          <td>{(state.score && state.score.total_ca) ? state.score.total_ca + "k€" : "-"}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
          </Col>
        </Row>
      </Grid>
    )
  }

  getStatus() {
    var status = "";
    switch(this.props.entity.playable) {
      case "to_launch":
        status = "pas encore lancée"
        break
      case "play":
        status = "en cours"
        break
      case "pause":
        status = "en pause"
        break
      case "stop":
        status = "terminée"
        break
    }
    return status;
  }

  getUserStates() {
    var round = this.props.entity.current_round
    if (this.props.entity.rounds.length > 1) {
      round = this.props.entity.rounds[this.props.entity.rounds.length - 2]
    }
    return round.userStates.sort(function(a, b) {
      if (a.score === null) return 1
      else if (b.score === null) return -1
      else return (a.score.total_position < b.score.total_position) ? -1 : 1;
    })
  }

}

export default SessionView
