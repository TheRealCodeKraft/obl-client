import React from "react"
import { connect } from 'react-redux';

import Players from './tables-manager/players'
import Tables from './tables-manager/tables'

class TablesManager extends React.Component {

  render() {
    return (
      <div>
        {this.props.entity.playable === "to_launch" || (this.props.entity.playable === "pause" && this.props.entity.rounds.length == 1 && this.props.entity.current_step == "waiting_players")
        ? [<div className="session-player-form-container">
             <Players session={this.props.entity} />
            </div>,
            <div className="session-table-form-container">
              <Tables session={this.props.entity} players={this.getAvailablePlayers()} />
            </div>]
        : <span>Tu ne peux pas modifier les joueurs d'une session qui a déjà été lancée</span>}
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
