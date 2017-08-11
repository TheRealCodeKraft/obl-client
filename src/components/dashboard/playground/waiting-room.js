import React from "react"
import { connect } from 'react-redux'

import SessionClient from 'clients/session'

import { Grid, Row, Col, Table, Button } from 'react-bootstrap';

class WaitingRoom extends React.Component {

  constructor(props) {
    super(props)

    this.goToScenario = this.goToScenario.bind(this)
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <h2><i className="pe pe-7s-users text-warning"></i> Joueurs ayant rejoint la salle de jeu</h2>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>

            <Table responsive>
              <thead>
                <tr>
                  <th>Pseudo</th>
                  <th>Prêt</th>
                </tr>
              </thead>
              <tbody>
              {this.props.session.players.map(player => {
                if (player.id === this.props.me.id) return null
                return (
                  <tr>
                    <td>{player.firstname}</td>
                    <td className="statut">
                      {this.playerConnected(player)
                       ? <i className="pe pe-7s-check text-success"></i>
                       : null}
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </Table>
            <Button onClick={this.goToScenario}>Prêts à jouer !</Button>
          </Col>
        </Row>
      </Grid>
    )
  }

  playerConnected(player) {
    return this.props.session.current_round.userStates.filter(state => { return state.user === player.id && state.connected }).length > 0
  }

  goToScenario() {
    SessionClient.scenario(this.props.session.id)
  }

}

function mapStateToProps(state) {
  return {
    me: state.userState.me || null,
  }
}

export default connect(mapStateToProps, {SessionClient})(WaitingRoom)
