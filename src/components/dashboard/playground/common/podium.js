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
        <Step state={states[1]} showTotals={this.props.showTotals} position="second" />
        <Step state={states[0]} showTotals={this.props.showTotals} position="first" />
        <Step state={states[2]} showTotals={this.props.showTotals} position="third" />
      </div>
    )
  }

  getPlayersStates() {
    var position = "position"
    var round = this.props.round
    if (!round) {
      round = this.props.session.current_round
      position = "total_position"
    } else {
      if (this.props.showTotals) {
        position = "total_position"
      }
    } 

    var states = round.userStates
    if (this.props.room) {
      states = states.filter(state => { return state.room.id === this.props.room.id })
      position = "room_position"
      if (this.props.scenario) {
        states = states.filter(state => { return state.scenario.id === this.props.scenario.id })
        position = "table_position"
      }
    }

    return states.sort(function(a, b) {
      if (a.score === null || a.score[position] === null) return 1
      else if (b.score === null || b.score[position] === null) return -1
      else return (a.score[position] < b.score[position]) ? -1 : 1;
    })
  }

}

export default Podium
