import React from "react"

class Level extends React.Component {

  render() {
    return (
      <div className="clue-levels-level">
        {this.props.level.description}
      </div>
    )
  }

}

export default Level
