import React from "react"

import Level from './levels/level.js'

class Levels extends React.Component {

  render() {
    return (
      <div className="clue-levels-list-container">
        {this.props.clue.levels.map(level => {
          return <Level level={level} />
        })}
      </div>
    )
  }

}

export default Levels
