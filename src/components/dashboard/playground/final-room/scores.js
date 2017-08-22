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
            <h2><i className="pe pe-7s-medal text-warning"></i> Votre score individuel pour cette simulation</h2>
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
/*
        <Row>
          <Col xs={12}>
            <div className="panel panel-jeu">
              <div className="panel-heading">
                <div className="panel-tools">
                  <a className="panel-toggle"><i className="fa fa-chevron-up text-warning"></i></a>
                </div>
                <h3>Scores brut</h3>
              </div>
              <div className="panel-body">
                <Grid fluid>
                  <Row className="details-score">
                    <Col xs={12}><h4>Pour le jeu</h4></Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col xs={4}><strong>COMPLETION</strong></Col>
                    <Col xs={8}>{this.currentUserState().score.completion_status}</Col>
                  </Row>
                  <Row>
                    <Col xs={4}><strong>RAW</strong></Col>
                    <Col xs={8}>{this.currentUserState().score.raw}</Col>
                  </Row>
                  <Row>
                    <Col xs={4}><strong>MIN</strong></Col>
                    <Col xs={8}>{this.currentUserState().score.min}</Col>
                  </Row>
                  <Row>
                    <Col xs={4}><strong>MAX</strong></Col>
                    <Col xs={8}>{this.currentUserState().score.max}</Col>
                  </Row>
                  <Row>
                    <Col xs={4}><strong>SCALED</strong></Col>
                    <Col xs={8}>{this.currentUserState().score.scaled}</Col>
                  </Row>
                  <hr />
                  <Row className="details-score">
                    <Col xs={12}><h4>Par objectif</h4></Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col xs={4}></Col>
                    <Col xs={2}><strong>RAW</strong></Col>
                    <Col xs={2}><strong>MIN</strong></Col>
                    <Col xs={2}><strong>MAX</strong></Col>
                    <Col xs={2}><strong>SCALED</strong></Col>
                  </Row>
                  {this.currentUserState().score.objectives.map(objective => {
                    return (
                      <Row>
                        <Col xs={4}>{objective.title}</Col>
                        <Col xs={2}>{objective.raw}</Col>
                        <Col xs={2}>{objective.min}</Col>
                        <Col xs={2}>{objective.max}</Col>
                        <Col xs={2}>{objective.scaled}</Col>
                      </Row>
                    )
                  })}
                </Grid>                
              </div>
            </div>
          </Col>
        </Row>
*/

  currentUserState() {
    return this.getUserState(this.props.me)
  }

  getUserState(user) {
    return this.props.session.current_round.userStates.filter(state => { return state.user === user.id })[0]
  }

  toggleScoreCollapse() {
    this.setState({scoreCollapsed: !this.state.scoreCollapsed})
  }

}

export default FinalRoomScores
