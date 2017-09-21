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
                <Podium session={this.props.session} showTotals={true} />
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col xs={12}>
            <div className={"panel panel-filled panel-default"}>
              <div className="panel-body">
                <h2><i className="pe pe-7s-graph3 text-warning"></i> Classement par round</h2>
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
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <div className={"panel panel-filled panel-default"}>
              <div className="panel-body">
                <h2><i className="pe pe-7s-graph text-warning"></i> Détails de mes scores</h2>
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
              </div>
            </div>
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
