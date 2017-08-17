import React from "react"

import { Grid, Row, Col, Table, Button } from 'react-bootstrap';

class FinalRoom extends React.Component {

  render() {
    return (
      <Grid>
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
            <div className="panel panel-jeu collapsed">
              <div className="panel-heading">
                <div className="panel-tools">
                  <a className="panel-toggle"><i className="fa fa-chevron-up text-warning"></i></a>
                </div>
                Score : <span className="score">87 %</span> <a href="#" className="infobulle" data-toggle="tooltip" title="" data-original-title="Score global sur cette simulation"><i className="pe pe-7s-info text-warning"></i></a>
              </div>
              <div className="panel-body">
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
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }

  playerHasFinished(player) {
    return this.props.session.current_round.userStates.filter(state => { return state.user === player.id })[0].decision_maker !== null
  }

}

export default FinalRoom
