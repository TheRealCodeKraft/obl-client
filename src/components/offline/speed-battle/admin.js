import React from "react"

import { connect } from "react-redux"

import { Grid, Row, Col, Panel, Button, Table } from 'react-bootstrap';

var FileSaver = require('filesaver.js-npm');

class SpeedAdmin extends React.Component {

  constructor(props) {
    super(props)

    this.handleGoToNextRound = this.handleGoToNextRound.bind(this)
    this.handleExport = this.handleExport.bind(this)
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} className="titre-accueil-jeu">
            <Panel className="panel-filled panel-c-warning">
              <Row>
                <Col md={9}>
                  <img src={this.props.session.game.picture} className="img-rounded image-header-playground" alt={this.props.session.game.title} />
                  <h1>Speed Battle Admin</h1>
                  <div className="small">{this.props.session.game.title} | {this.props.session.title}</div>
                </Col>
                <Col md={3}>
                </Col>
              </Row>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col xs={12} style={{display: "flex", justifyContent: "space-between"}}>
            <h4>Toutes les battles</h4>
            <Button onClick={this.handleGoToNextRound}>Passer à la partie suivante</Button>
          </Col>
          <Col xs={12}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <Table className="indices">
                    <thead>
                      <tr>
                        <th colSpan="3">Joueur 1</th>
                        <th colSpan="3">Joueur 2</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.session.rounds.map((round, index) => {
                        return (
                          <tr>
                            {round.userStates.sort(function(a, b) { return a.player.id > b.player.id }).map((st, sti) => {
                              return [
                                  <td>{st.player.lastname}</td>,
                                  <td>{st.email ? st.email : "Pas de mail"}</td>,
                                  <td>{sti === 0 ? "Gagné!" : "Perdu..."}</td>
                              ]
                            })}
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col xs={12} style={{display: "flex", justifyContent: "space-between"}}>
                  <h4>Tous les emails</h4>
                  <Button onClick={this.handleExport}>Exporter</Button>
                </Col>
                <Col xs={12}>
                  {this.props.session.rounds.map((round, index) => {
                    return round.userStates.map(state => {
                      return state.email ? <div>{state.email}</div> : null
                    })
                  })}
                </Col>
              </Row>
            </Grid>
          </Col>
        </Row>
      </Grid>
    )
  }

  handleGoToNextRound() {
    this.props.clients.SessionClient.nextRound(this.props.session.id)
  }

  buildCsv() {
    var csv = ""
    for (var i in this.props.session.rounds) {
      for (var j in this.props.session.rounds[i].userStates) {
        if (this.props.session.rounds[i].userStates[j].email) {
          csv += this.props.session.rounds[i].userStates[j].email + "\r\n"
        }
      }
    }
    return csv
  }

  handleExport() {
    FileSaver.saveAs(new Blob([this.buildCsv()], {type: "csv"}), "export.csv");
  }
}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients || {},
  }
}

export default connect(mapStateToProps)(SpeedAdmin)
