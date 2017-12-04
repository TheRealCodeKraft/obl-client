import React from "react"

import { connect } from 'react-redux'

import Players from '../../dashboard/playground/final-room/players'
import Podium from '../../dashboard/playground/common/podium'
import BaseScores from '../../dashboard/playground/common/scores'
import MailTrapper from './mail-trapper'

import { Grid, Row, Col, Panel } from 'react-bootstrap';

class Scores extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }

    this.handleNext = this.handleNext.bind(this)
  }

  render() {
    return (
      <Grid className="container-center animated slideInDown">
         <Row className="view-header">
          <div className={"header-icon"}>
              <i className={"pe page-header-icon pe-7s-medal"}></i>
          </div>
          <div className={"header-title"}>
              <h3>Scores</h3>
              <small>
                Résultats du battle
              </small>
          </div>
        </Row>

        <Panel className="panel panel-filled" style={{textAlign: "center"}}>
          {this.props.finished
           ? [this.getScores(),
              <MailTrapper userState={this.currentUserState()} />,
              this.getNextButton()]
           : [<div><span>Votre score : </span>{this.currentUserState().score.ca}k€</div>,
              <span>Nous attendons les autres joueurs</span>,
              <MailTrapper userState={this.currentUserState()} />]}
        </Panel>
     
      </Grid>
    )
  }

  getScores() {
    var states = this.getPlayersStates()
    return (
      <div>
        {this.props.me.id == states[0].player.id
         ? <h3>Vous avez gagné !</h3>
         : <h3>Vous avez perdu</h3>}
      {/*<h3><strong>{states[0].player.lastname}</strong> gagne !</h3>*/}
        {states.map(state => {
          return (
            <div><span>{state.player.id == this.props.me.id ? "Vous" : state.player.lastname}</span> : {state.score.ca}k€</div>
          )
        })}
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

  getNextButton() {
    return this.state.loading
           ? <span>Chargement de la nouvelle session</span>
           : <a className={"btn btn-default btn-play"} onClick={this.handleNext}>Nouvelle partie</a>
  }

  currentUserState() {
    return this.getUserState(this.props.me)
  }

  getUserState(user) {
    return this.props.session.current_round.userStates.filter(state => { return state.user === user.id })[0]
  }

  handleNext(e) {
    e.preventDefault()
    var self=this
    this.setState({loading: true}, function() {
      this.props.clients.SessionClient.nextRound(this.props.session.id)
    })
    //if (this.props.onNext) this.props.onNext()
  }

}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients || {}
  }
}
export default connect(mapStateToProps)(Scores)
