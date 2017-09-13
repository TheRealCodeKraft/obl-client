import React from "react"
import { connect } from 'react-redux'

import { Grid, Row, Col, Table, Button } from 'react-bootstrap'

import Moment from 'react-moment'

class Inviter extends React.Component {

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <Table responsive>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Dernier envoi</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td><Button onClick={this.sendInvitationToAll.bind(this)}>Inviter tout le monde</Button></td>
                </tr>
                {this.getPlayers().map(player => {
                  return (
                    <tr>
                      <td>{player.fullname}</td>
                      <td><Moment format="DD/MM/YYYY HH:mm:ss">{this.getLastUpdate(player)}</Moment></td>
                      <td><Button onClick={this.sendInvitation.bind(this, player)}>Inviter</Button></td>
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

  getPlayers() {
    return this.props.entity.players.sort(function(a, b) {
      if (a.firstname === null) return 1
      if (b.firstname === null) return -1
      return a.firstname > b.firstname
    })
  }

  getLastUpdate(player) {
    var filter = this.props.entity.invitations.filter(invit => { return invit.user_id == player.id })
    if (filter.length === 1) return filter[0].updated_at
    else return null
  }

  sendInvitation(player) {
    this.props.clients.SessionClient.invite(this.props.entity, player)
  }

  sendInvitationToAll() {
    this.props.clients.SessionClient.inviteAll(this.props.entity)
  }

}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients || {},
  }
}

export default connect(mapStateToProps)(Inviter)
