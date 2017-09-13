import React from "react"

import Levels from './levels-manager/levels'
import LevelForm from './levels-manager/form'

class LevelsManager extends React.Component {

  render() {
    return (
      <div>
        <div className="clue-levels-list">
          <Levels clue={this.props.entity} />
        </div>
        <div className="clue-levels-form">
          <LevelForm clue={this.props.entity} />
        </div>
      </div>
    )
  }

}

export default LevelsManager
