import React from "react"
import { connect } from 'react-redux'

import { Grid, Row, Col, Table, Button } from 'react-bootstrap';

import Players from './final-room/players'
import Scores from './common/scores'

class FinalRoom extends React.Component {

  render() {
    if (!this.props.session) return null
    return (
      <div>
        <Scores session={this.props.session} me={this.props.me} />
        <hr />
        <Players title="Classement provisoire" session={this.props.session} me={this.props.me} />
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    me: state.userState.me || null,
  }
}

export default connect(mapStateToProps)(FinalRoom)
