import React from "react"
import { connect } from 'react-redux'

import SessionClient from 'clients/session'

import Session from './sessions/session'

class Sessions extends React.Component {

  componentWillMount() {
    SessionClient.sessions()
  }

  render() {
    return (
      <div id="sessions">
        {this.props.sessions.map(session => {
          return <Session key={"session-" + session.id} session={session} />
        })}
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    sessions: state.sessionState.sessions || []
  }
}

export default connect(mapStateToProps)(Sessions)
