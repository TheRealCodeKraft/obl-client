import React from "react"
import { connect } from 'react-redux'

import SessionClient from 'clients/session'

import Session from './sessions/session'

import {Grid, Row, Col} from "react-bootstrap"

class Sessions extends React.Component {

  componentWillMount() {
    SessionClient.fetchAll({current: true})
  }

  render() {
    var sessions = this.buildSessions()
    return (
      <section className="content">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <h1><i className={"pe pe-7s-joy text-warning"}></i> Jeux</h1>
            </Col>
         </Row>
         {sessions.filter(session => {return session !== null }).length > 0
          ? sessions
          : <Row><Col xs={12}>Vous n'avez été invité à aucune session pour le moment</Col></Row>}
       </Grid>
      </section>
    )
  }

  buildSessions() {
    return this.props.sessions.map(session => {
             var ui = <Session key={"session-" + session.id} session={session} />
             if (this.props.me.role === "admin" && session.players.filter(player => {return player.id === this.props.me.id}).length === 0) {
               ui = null
             }
             return ui
           })
  }

}

function mapStateToProps(state) {
  return {
    me: state.userState.me || null,
    sessions: state.sessionState.sessions || []
  }
}

export default connect(mapStateToProps)(Sessions)
