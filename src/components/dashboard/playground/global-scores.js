import React from "react"

import { connect } from 'react-redux'

import { Grid, Row, Col } from 'react-bootstrap';

import RoundScores from './global-scores/round'
import Podium from './common/podium'
import Scores from './common/scores'

class GlobalScores extends React.Component {

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <h2><i className="pe pe-7s-paper-plane text-warning"></i> Podium</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Podium session={this.props.session} />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs={12}>
            <h2><i className="pe pe-7s-medal text-warning"></i> Détails des scores</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {this.props.session.rounds.map((round, index) => {
              return <RoundScores me={this.props.me}
                                  round={round}
                                  roundIndex={index+1}
                                  totalRounds={this.props.session.rounds.length}
                     />
            })}
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs={12}>
            <h2><i className="pe pe-7s-gleam text-warning"></i> Détails de mes scores</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {this.props.session.rounds.map((round, index) => {
              return <Scores me={this.props.me}
                             round={round}
                             roundIndex={index+1}
                             totalRounds={this.props.session.rounds.length}
                     />
            })}
          </Col>
        </Row>
      </Grid>
    )
  }

}

function mapStateToProps(state) {
  return {
    me: state.userState.me || null,
  }
}

export default connect(mapStateToProps)(GlobalScores)
