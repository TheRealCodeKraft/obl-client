import React from "react"
import { connect } from 'react-redux';

import Players from './tables-manager/players'
import Tables from './tables-manager/tables'

class TablesManager extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="session-player-form-container">
          <Players session={this.props.entity} />
        </div>
        <div className="session-table-form-container">
          <Tables session={this.props.entity} players={this.getAvailablePlayers()} />
        </div>
      </div>
    )
  }

  getAvailablePlayers() {
    return this.props.entity.players
  }

}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(TablesManager)
