import React from "react"
import { Grid, Row, Col, Table } from 'react-bootstrap';

class WaitingRoom extends React.Component {

  constructor(props) {
    super(props)
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
          </Col>
        </Row>
      </Grid>
    )
  }

  playerConnected(player) {
    return this.props.session.tables[0].userStates.filter(state => { return state.user == player.id && state.connected }).length > 0
  }

}

export default WaitingRoom
