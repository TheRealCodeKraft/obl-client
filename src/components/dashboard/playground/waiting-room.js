import React from "react"
import { connect } from 'react-redux'

import SessionClient from 'clients/session'

import { Grid, Row, Col, Table, Button } from 'react-bootstrap';

class WaitingRoom extends React.Component {

  constructor(props) {
    super(props)

    this.goToRoom = this.goToRoom.bind(this)
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <h2><i className="pe pe-7s-users text-warning"></i> Joueurs ayant rejoint la session</h2>
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
            {this.playersConnected() ? <Button onClick={this.goToRoom}>Prêts à jouer !</Button> : null}
          </Col>
        </Row>
      </Grid>
    )
  }

  playerConnected(player) {
    return this.props.session.current_round.userStates.filter(state => { return state.user === player.id && state.connected }).length > 0
  }

  playersConnected() {
    return this.props.session.players.length === this.props.session.current_round.userStates.filter(state => { return state.connected }).length
  }

  goToRoom() {
    SessionClient.room(this.props.session.id)
  }

}

function mapStateToProps(state) {
  return {
    me: state.userState.me || null,
  }
}

export default connect(mapStateToProps, {SessionClient})(WaitingRoom)
