import React from "react"

import Players from './tables-manager/players'
import Tables from './tables-manager/tables'

class TablesManager extends React.Component {

  render() {
    return (
      <div>
        {/*this.props.entity.playable === "to_launch" || (this.props.entity.playable === "pause" && this.props.entity.rounds.length == 1 && this.props.entity.current_step == "waiting_players")
        ? <div className="session-player-form-container">
             <Players session={this.props.entity} onFinished={this.handleFinished.bind(this)} />
            </div>
        : <span>Tu ne peux pas modifier les joueurs d'une session qui a déjà été lancée</span>*/}
        {this.props.entity.playable === "to_launch" || (this.props.entity.playable === "pause" && this.props.entity.rounds.length == 1 && this.props.entity.current_step == "waiting_players")
         ? null
         : <div style={{display: "flex", alignItems: "center", marginBottom: 15}}>
             <i className="pe pe-7s-attention text-warning" style={{fontSize: "4em", marginRight: 10}} />
             <div style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
               <strong style={{fontSize: "1.2em"}}>Attention, partie en cours. N'ajoutez pas de nouveaux joueurs !</strong>
               <p>La suppression d'un joueur de la session entrainera la suppression de toutes les données associées (scores, objectifs, etc.)</p>
             </div>
           </div>}
        <div className="session-player-form-container">
          <Players session={this.props.entity} onFinished={this.handleFinished.bind(this)} />
        </div>
      </div>
    )

{/*,
            <div className="session-table-form-container">
              <Tables session={this.props.entity} players={this.getAvailablePlayers()} />
            </div>*/}
  }

  getAvailablePlayers() {
    return this.props.entity.players
  }

  handleFinished() {
    this.props.onFinished()
  }

}

export default TablesManager
