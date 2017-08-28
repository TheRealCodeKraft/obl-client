import React from "react"

import { Grid, Row, Col } from 'react-bootstrap';

class FinalRoomScores extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      scoreCollapsed: true,
    }

    this.toggleScoreCollapse = this.toggleScoreCollapse.bind(this)
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            {this.props.round
            ? <h4><i className="pe pe-7s-light text-warning"></i> Round {this.props.roundIndex} / {this.props.totalRounds}</h4>
            : <h2><i className="pe pe-7s-medal text-warning"></i> Votre score individuel pour cette simulation</h2>}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            Chiffre d’affaire : <span className="score"><strong>{this.currentUserState().score.ca}k€</strong></span>
          </Col>
        </Row>
        <hr className="hr-standard" />
        <Row>
          <Col xs={12}>
            <div className={"panel panel-jeu" + (this.state.scoreCollapsed ? " collapsed" : "")}>
              <div className="panel-heading">
                <div className="panel-tools">
                  <a className="panel-toggle" onClick={this.toggleScoreCollapse}><i className="fa fa-chevron-up text-warning"></i></a>
                </div>
                Score : <span className="score">{this.currentUserState().score.scaled * 100} %</span> <a href="#" className="infobulle" data-toggle="tooltip" title="" data-original-title="Score global sur cette simulation"><i className="pe pe-7s-info text-warning"></i></a>
              </div>
              <div className="panel-body">
                {this.currentUserState().score.objectives.map(objective => {
                  return (
                  <Row className="detail-score">
                    <Col xs={9} sm={6} md={4}>
                      {objective.title}
                    </Col>
                    <Col xs={3} sm={6} md={8}>
                      {Math.round(objective.scaled * 100)} % {/*<a href="#" className="infobulle" data-toggle="tooltip" title="" data-original-title="Score sur la compétence"><i className="pe pe-7s-info text-warning"></i></a>*/}
                    </Col>
                  </Row>
                  )
                })}
              </div>
            </div>
          </Col>
        </Row>
      </Grid>

    )
  }

  currentUserState() {
    return this.getUserState(this.props.me)
  }

  getUserState(user) {
    var round = this.props.round
    if (!round) {
      round = this.props.session.current_round
    }
    return round.userStates.filter(state => { return state.user === user.id })[0]
  }

  toggleScoreCollapse() {
    this.setState({scoreCollapsed: !this.state.scoreCollapsed})
  }

}

export default FinalRoomScores
