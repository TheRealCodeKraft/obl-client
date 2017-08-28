import React from "react"

class PodiumStep extends React.Component {

  render() {
    return (
      <div className={"podium-box " + this.props.position}>
        <div className="podium-score">
          {this.props.state ? this.props.state.player.firstname : "-"}
        </div>
        <div className="podium-step">
          <div className="podium-ca">
            {(this.props.state && this.props.state.score)
             ? this.props.state.score.ca + "k€"
             : "-"}
          </div>
        </div>
      </div>
    )
  }

}

export default PodiumStep
