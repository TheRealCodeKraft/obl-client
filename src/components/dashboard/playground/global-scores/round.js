import React from "react"

import Moment from 'react-moment'

import { Grid, Row, Col } from 'react-bootstrap';
import Podium from '../common/podium'

class RoundScores extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      collapsed: true,
    }

    this.toggleCollapse = this.toggleCollapse.bind(this)
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <div className={"panel panel-jeu" + (this.state.collapsed ? " collapsed" : "")}>
              <div className="panel-heading">
                <div className="panel-tools">
                  <a className="panel-toggle" onClick={this.toggleCollapse}><i className="fa fa-chevron-up text-warning"></i></a>
                </div>
                <Grid fluid>
                  <Row style={{display: "flex", alignItems: "center"}}>
                    <Col xs={4}>
                      <h4><i className="pe pe-7s-medal text-warning"></i> Round {this.props.roundIndex} / {this.props.totalRounds}</h4>
                    </Col>
                    <Col xs={8}>
                      <Podium round={this.props.round} tinyfy={true} />
                    </Col>
                  </Row>
                </Grid>
              </div>
              <div className="panel-body">
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
                          <td>{state.score ? state.score.position : "-"}</td>
                          <td>{state.player.firstname}</td>
                          <td>{state.score ? state.score.raw + " pts" : "-"}</td>
                          <td>{state.score ? <Moment format="mm:ss">{state.score.session_time}</Moment> : "-"}</td>
                          <td>{(!state.score || state.score.ca === 0) ? "-" : state.score.ca + "k€"}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }

  getPlayersStates() {
    return this.props.round.userStates.sort(function(a, b) {
      if (a.score === null) return 1
      else if (b.score === null) return -1
      else return (a.score.position < b.score.position) ? -1 : 1;
    })
  }

  currentUserState() {
    return this.getUserState(this.props.me)
  }

  getUserState(user) {
    return this.props.session.current_round.userStates.filter(state => { return state.user === user.id })[0]
  }

  toggleCollapse() {
console.log("COLLAPSE");
    this.setState({collapsed: !this.state.collapsed})
  }

}

export default RoundScores
