import React from "react"

import { Grid, Row, Col } from 'react-bootstrap';

import Step from './podium/step'

class Podium extends React.Component {

  render() {
    const states = this.getPlayersStates()
    const styles = {}
    if (this.props.tinyfy) {
      styles.fontSize = "0.4em"
      styles.height = 50
    }
    return (
      <div className="podium" style={styles}>
        <Step state={states[1]} totals={this.props.totalsForSession} position="second" />
        <Step state={states[0]} totals={this.props.totalsForSession} position="first" />
        <Step state={states[2]} totals={this.props.totalsForSession} position="third" />
      </div>
    )
  }

  getPlayersStates() {
    var round = this.props.round
    if (!round) {
      round = this.props.session.current_round
      return round.userStates.sort(function(a, b) {
        if (a.score === null) return 1
        else if (b.score === null) return -1
        else return (a.score.total_position < b.score.total_position) ? -1 : 1;
      })
    } else {
      return round.userStates.sort(function(a, b) {
        if (a.score === null) return 1
        else if (b.score === null) return -1
        else return (a.score.position < b.score.position) ? -1 : 1;
      })

    } 
  }

}

export default Podium
