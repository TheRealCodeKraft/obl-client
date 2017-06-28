import React from "react"
import { connect } from 'react-redux'

import GameClient from 'clients/game'

import Game from './games/game'

class Games extends React.Component {

  componentWillMount() {
    GameClient.games()
  }

  render() {
    return (
      <div id="games">
        {this.props.games.map(game => {
          return <Game key={"game-" + game.id} game={game} />
        })}
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    games: state.gameState.games || []
  }
}

export default connect(mapStateToProps)(Games)
