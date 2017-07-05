import React from "react"
import { connect } from 'react-redux'

import SessionClient from 'clients/session'

import Session from './sessions/session'

class Sessions extends React.Component {

  componentWillMount() {
    SessionClient.fetchAll({current: true})
  }

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <h1><i className={"pe pe-7s-joy text-warning"}></i> Jeux</h1>
            </div>
         </div>
         {this.props.sessions.map(session => {
           return <Session key={"session-" + session.id} session={session} />
         })}
       </div>
      </section>
    )
  }

}

function mapStateToProps(state) {
  return {
    sessions: state.sessionState.sessions || []
  }
}

export default connect(mapStateToProps)(Sessions)
