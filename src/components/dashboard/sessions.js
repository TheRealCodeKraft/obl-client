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
    return (
      <section className="content">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <h1><i className={"pe pe-7s-joy text-warning"}></i> Jeux</h1>
            </Col>
         </Row>
         {this.props.sessions.map(session => {
           return <Session key={"session-" + session.id} session={session} />
         })}
       </Grid>
      </section>
    )
  }

}

function mapStateToProps(state) {
console.log(state)
  return {
    sessions: state.sessionState.sessions || []
  }
}

export default connect(mapStateToProps)(Sessions)
