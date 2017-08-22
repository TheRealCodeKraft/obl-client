import React from "react"
import { connect } from 'react-redux'

import SessionClient from 'clients/session'

import { Grid, Row, Col, Table, Button } from 'react-bootstrap';

class FinalRoom extends React.Component {

  render() {
console.log(this.currentUserState())
console.log(this.currentUserState().score)
console.log(this.currentUserState().score.objectives)
    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <h2><i className="pe pe-7s-users text-warning"></i> Joueurs participant au Business Battle</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <table className="table">
              <thead>
                <tr>
                  <th>Pseudo</th>
                  <th>A terminé</th>
                </tr>
              </thead>
              <tbody>
                {this.props.session.players.map(player => {
                  return (
                    <tr>
                      <td>{player.firstname}</td>
                      <td className="statut">
                        {this.playerHasFinished(player) ? <i className="pe pe-7s-check text-success"></i> : null}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <h2><i className="pe pe-7s-medal text-warning"></i> Votre score individuel pour cette simulation</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            Chiffre d’affaire : <span className="score">8k€</span>
          </Col>
        </Row>
        <hr className="hr-standard" />
        <Row>
          <Col xs={12}>
            <div className="panel panel-jeu"> {/*collapsed"*/}
              <div className="panel-heading">
                <div className="panel-tools">
                  <a className="panel-toggle"><i className="fa fa-chevron-up text-warning"></i></a>
                </div>
                {/*Score : <span className="score">87 %</span> <a href="#" className="infobulle" data-toggle="tooltip" title="" data-original-title="Score global sur cette simulation"><i className="pe pe-7s-info text-warning"></i></a>*/}
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
{/*
                <Row className="detail-score">
                  <Col xs={9} sm={6} md={4}>
                    Prise de contact
                  </Col>
                  <Col xs={3} sm={6} md={8}>
                    70 % <a href="#" className="infobulle" data-toggle="tooltip" title="" data-original-title="Score sur la compétence"><i className="pe pe-7s-info text-warning"></i></a>
                  </Col>
                </Row>
                <Row className="detail-score">
                  <Col xs={9} sm={6} md={4}>
                    Découverte
                  </Col>
                  <Col xs={3} sm={6} md={8}>
                    67 %
                  </Col>
                </Row>
                <Row className="detail-score">
                  <Col xs={9} sm={6} md={4}>
                    Argumentation
                  </Col>
                  <Col xs={3} sm={6} md={8}>
                    91 %
                  </Col>
                </Row>
                <Row className="detail-score">
                  <Col xs={9} sm={6} md={4}>
                    Traitement des objections
                  </Col>
                  <Col xs={3} sm={6} md={8}>
                    82 %
                  </Col>
                </Row>
                <Row className="detail-score">
                  <Col xs={9} sm={6} md={4}>
                  </Col>
                  <Col xs={3} sm={6} md={8}>
                    82 %
                  </Col>
                </Row>
                <Row className="detail-score">
                  <Col xs={9} sm={6} md={4}>
                    Conclusion
                  </Col>
                  <Col xs={3} sm={6} md={8}>
                    82 %
                  </Col>
                </Row>
                <Row className="detail-score">
                  <Col xs={9} sm={6} md={4}>
                    Prise de congé
                  </Col>
                  <Col xs={3} sm={6} md={8}>
                    8 %
                  </Col>
                </Row>
                <Row className="detail-score">
                  <Col xs={9} sm={6} md={4}>
                    Temps
                  </Col>
                  <Col xs={3} sm={6} md={8}>
                    82 %
                  </Col>
                </Row>
*/}
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
    return this.props.session.current_round.userStates.filter(state => { return state.user === user.id })[0]
  }

  playerHasFinished(player) {
    return this.props.session.current_round.userStates.filter(state => { return state.user === player.id })[0].decision_maker !== null
  }

}

function mapStateToProps(state) {
  return {
    me: state.userState.me || null,
  }
}

export default connect(mapStateToProps)(FinalRoom)
