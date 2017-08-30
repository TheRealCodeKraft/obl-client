import React from "react"

import ClueClient from 'clients/clue'

class Level extends React.Component {

  constructor(props) {
    super(props)
    
    this.goUp = this.goUp.bind(this)
    this.goDown = this.goDown.bind(this)
    this.onDestroy = this.onDestroy.bind(this)
  }

  render() {
    return (
      <div className="clue-levels-level">
        <div className="up-and-down">
          {this.props.index !== 1 ? <a href="#" onClick={this.goUp}><span className="pe-7s-angle-up"></span></a> : <span />}
          {this.props.last ? <span /> : <a href="#" onClick={this.goDown}><span className="pe-7s-angle-down"></span></a>}
        </div>
        <span className="level-level">{this.props.index}</span>
        <span className="level-description">{this.props.level.description}</span>
        <div className="level-actions">
          <a className="admin-action-button pe pe-7s-junk" href="#" alt="Supprimer" title="Supprimer" onClick={this.onDestroy}></a>
        </div>
      </div>
    )
  }

  goUp(e) {
    e.preventDefault()
    if (!this.props.sorting && this.props.onUp) this.props.onUp(this.props.level.id)
  }

  goDown(e) {
    e.preventDefault()
    if (!this.props.sorting && this.props.onDown) this.props.onDown(this.props.level.id)
  }

  onDestroy(e) {
    e.preventDefault()
    ClueClient.destroyLevel(this.props.level.id)
  }

}

export default Level
