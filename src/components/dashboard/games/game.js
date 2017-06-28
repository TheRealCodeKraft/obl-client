import React from "react"

class Game extends React.Component {

  constructor(props) {
    super(props)
    
    this.goToGame = this.goToGame.bind(this)
  }

  render() {
    return (
      <div className="game">
        <span>{this.props.game.title}</span>
{/*
        <span>{this.props.game.sessionTitle}</span>
        <a href="#" onClick={this.goToGame}>{this.getButtonLabel()}</a>
*/}
      </div>
    )
  }

  goToGame(e) {
    e.prevenDefault()
  }

}

export default Game
