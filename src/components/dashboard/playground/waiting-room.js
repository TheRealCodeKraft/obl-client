import React from "react"

class WaitingRoom extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <h2><i className="pe pe-7s-users text-warning"></i> Joueurs ayant rejoint la salle de jeu</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">

            <table className="table">
              <thead>
                <tr>
                  <th>Pseudo</th>
                  <th>Prêt</th>
                </tr>
              </thead>
              <tbody>
              {this.props.session.players.map(player => {
                return (
                  <tr>
                    <td>{player.firstname}</td>
                    <td className="statut">
                      {this.playerConnected(player)
                       ? <i className="pe pe-7s-check text-success"></i>
                       : null}
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  playerConnected(player) {
    return this.props.session.tables[0].userStates.filter(state => { return state.user == player.id && state.connected }).length > 0
  }

}

export default WaitingRoom
