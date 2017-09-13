import React from "react"
import { connect } from 'react-redux';

import Level from './levels/level.js'

class Levels extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      sorting: false
    }

    this.onUp = this.onUp.bind(this)
    this.onDown = this.onDown.bind(this)
    this.onSorted = this.onSorted.bind(this)
  }

  render() {
    return (
      <div className="clue-levels-list-container">
        {this.props.clue.levels.map((level, index) => {
          return <Level level={level} 
                        index={index+1} 
                        last={index === this.props.clue.levels.length - 1}
                        sorting={this.state.sorting}
                        onUp={this.onUp}
                        onDown={this.onDown} />
        })}
      </div>
    )
  }

  onUp(level_id) {
    this.setState({sorting: true}, function() {
      this.props.clients.ClueClient.sortLevels(this.props.clue.id, level_id, "up", this.onSorted) 
    })
  }

  onDown(level_id) {
    this.setState({sorting: true}, function() {
      this.props.clients.ClueClient.sortLevels(this.props.clue.id, level_id, "down", this.onSorted) 
    })
  }

  onSorted() {
    this.setState({sorting: false})
  }

}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients || {}
  }
}

export default connect(mapStateToProps)(Levels)
