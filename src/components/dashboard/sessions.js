import React from "react"
import { connect } from 'react-redux'

import Session from './sessions/session'

import {Grid, Row, Col} from "react-bootstrap"

class Sessions extends React.Component {

  componentWillMount() {
    var self=this
    this.setState({loading: true}, function() {
      this.props.clients.SessionClient.fetchAll({current: true}, function() {
        self.setState({loading: false})
      })
    })
  }

  render() {
    var sessions = this.buildSessions()
    return (
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <h1><i className={"pe pe-7s-joy text-warning"}></i> Jeux</h1>
            </Col>
         </Row>
         {sessions.filter(session => {return session !== null }).length > 0
          ? sessions
          : (this.state.loading
             ? <Row><Col xs={12}>Chargement des sessions en cours</Col></Row>
             : <Row><Col xs={12}>Vous n'avez été invité à aucune session pour le moment</Col></Row>)
         }
       </Grid>
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
  console.log(state)
  return {
    me: state.userState.me || null,
    sessions: state.sessionState.sessions || [],
    clients: state.bootstrap.clients || {}
  }
}

export default connect(mapStateToProps)(Sessions)
