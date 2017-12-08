import React from "react"

import { connect } from 'react-redux'

import Players from '../../dashboard/playground/final-room/players'
import Step from '../../dashboard/playground/common/podium/step'
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

  getStep(state) {
    if (state.score.room_position > 3) return null
    return (
      <div className={"podium-box " + (state.score.room_position == 1 ? "first" : (state.score.room_position == 2 ? "second" : "third"))}>
        <div className="podium-score">
          {state.player.id === this.props.me.id ? "Vous" : state.player.lastname}
        </div>
        <div className="podium-step">
          <div className="podium-ca">
            {state.score.raw}
          </div>
        </div>
      </div>
    )
  }

  getScores() {
    var states = this.getPlayersStates()
    return (
      <div>
        {this.props.me.id == states[0].player.id
         ? <h3>Vous avez gagné !</h3>
         : <h3>Vous avez perdu</h3>}
        <div className="podium" style={{fontSize: "0.4em", height: 100}}>
          {this.getPlayersStates().map(state => {
            return this.getStep(state)
          })}
        </div>
        <h4>Détails de votre score</h4>
        {this.currentUserState().score.objectives.map(objective => {
          return (
            <div className="detail-score" style={{textAlign: "left"}}>
              <span>
                <i className="pe pe-7s-angle-right text-warning"></i>{objective.title}
              </span> :&nbsp; &nbsp;
              <span>
                {(objective.scaled * 100) > 100 ? "100" : Math.round(objective.scaled * 100)} % 
              </span>
            </div>
            )
        })}
      </div>
    )
  }

  getPlayersStates() {
    var position = "position"
    var round = this.props.session.current_round
    return round.userStates.sort(function(a, b) {
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
