import React from "react"

import SessionClient from 'clients/session'

import { Grid, Row, Col, Table, Button } from 'react-bootstrap'

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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.props.entity.players.map(player => {
                  return (
                    <tr>
                      <td>{player.fullname}</td>
                      <td><Button onClick={this.sendInvitation.bind(this, player)}>Inviter</Button></td>
                    </tr>
                  )
                })}
                <tr>
                  <td></td>
                  <td><Button onClick={this.sendInvitationToAll.bind(this)}>Inviter tout le monde</Button></td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Grid>
    )
  }

  sendInvitation(player) {
    SessionClient.invite(this.props.entity, player)
  }

  sendInvitationToAll() {
    SessionClient.inviteAll(this.props.entity)
  }

}

export default Inviter
