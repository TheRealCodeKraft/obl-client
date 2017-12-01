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
            <div className={"panel panel-jeu" + (this.state.scoreCollapsed ? " collapsed" : "")}>
              <div className="panel-heading panel-heading-global-scores">
                <div className="panel-tools">
                  <a className="panel-toggle" onClick={this.toggleScoreCollapse}><i className="fa fa-chevron-up text-warning"></i></a>
                </div>
                {this.props.round
                ? <h4>Round {this.props.roundIndex} / {this.props.totalRounds}</h4>
                : <h2>Votre score individuel pour cette simulation</h2>}
              </div>
              <div className="panel-body panel-body-global-scores">
                <Grid fluid>
                  <Row>
                    <Col xs={12}>
                      <h4 className={"title-chiffre-affaire"}>Chiffre d’affaire : <span className="score">{this.currentUserState().score.ca}k€</span></h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <h4 className={"title-chiffre-affaire"}>Score : <span className="score"> {Math.round(this.currentUserState().score.scaled * 100)}%</span></h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      {this.currentUserState().score.objectives.map(objective => {
                        return (
                          <Row className="detail-score">
                                  <Col xs={9} sm={6} md={6}>
                                    <i className="pe pe-7s-angle-right text-warning"></i>{objective.title}
                                  </Col>
                                  <Col xs={3} sm={6} md={6}>
                                    {(objective.scaled * 100) > 100 ? "100" : Math.round(objective.scaled * 100)} % 
                                  </Col>
                          </Row>
                          )
                        })}
                    </Col>
                  </Row>
                </Grid>
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
console.log(round.userStates.filter(state => { return state.user === user.id })[0])
    return round.userStates.filter(state => { return state.user === user.id })[0]
  }

  toggleScoreCollapse() {
    this.setState({scoreCollapsed: !this.state.scoreCollapsed})
  }

}

export default FinalRoomScores
