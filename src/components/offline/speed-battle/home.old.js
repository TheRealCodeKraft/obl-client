import React from "react"

import { connect } from 'react-redux'

import { Grid, Row, Col, Panel, Table } from 'react-bootstrap';

class Explanations extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }

    this.handlePlay = this.handlePlay.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.doPing = this.doPing.bind(this)
  }

  componentDidMount() {
      //this.startPolling()
  }

  componentWillUnmount() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  render() {

    if (this.props.session.machine_count == this.props.session.players.filter(player => { return player.role !== "admin" }).length && this.playersConnected()) {
      this.props.clients.SessionClient.battleGo()
    }
    if (!this.playerConnected(this.props.me)) {
      return (
        <Grid className="container-center animated slideInDown">
           <Row className="view-header">
            <div className={"header-icon"}>
                <i className={"pe page-header-icon pe-7s-cup"}></i>
            </div>
            <div className={"header-title"}>
                <h3>Business Battle</h3>
                <small>
                  Mesurez-vous à vos adversaires dans un Speed Battle !
                </small>
            </div>
          </Row>

          <Panel className="panel panel-filled" style={this.state.loading ? {textAlign: "center"} : null}>
            {this.state.loading
             ? <span>Chargement de la session</span>
             : <a className={"btn btn-default btn-play"} onClick={this.handlePlay}>Je joue</a>}
          </Panel>
       
        </Grid>
      )
    } else {
      return (
        <Grid className="container-center animated slideInDown">
           <Row className="view-header">
            <div className={"header-icon"}>
                <i className={"pe page-header-icon pe-7s-rocket"}></i>
            </div>
            <div className={"header-title"}>
                <h3>Attention au décollage !</h3>
                <small>
                  En attente des autres joueurs
                </small>
            </div>
          </Row>

          <Panel className="panel panel-filled" style={this.props.session.players.filter(player => { return player.role !== "admin" }).length == this.props.session.machine_count && this.playersConnected() ? {textAlign: "center"} : null}>
            {this.props.session.players.filter(player => { return player.role !== "admin" }).length == this.props.session.machine_count && this.playersConnected()
             ? <span>Chargement de la session</span>
             : <Table responsive>
                 <thead>
                   <tr>
                     <th>Pseudo</th>
                     <th>Prêt</th>
                   </tr>
                 </thead>
                 <tbody>

                   {this.props.session.players.filter(player => { return player.role !== "admin" }).map(player => {
                     /*if (player.id === this.props.me.id) return null*/
                     return (
                       <tr>
                         <td>{player.lastname}</td>
                         <td className="statut">
                           {this.playerConnected(player)
                            ? <i className="pe pe-7s-check text-success"></i>
                            : null}
                         </td>
                       </tr>
                     )
                   })}
                 </tbody>
               </Table>}
          </Panel>
       
        </Grid>
      )
    }
  }

  startPolling() {
    var self = this;
    setTimeout(function() {
      self.doPing(); // do it once and then start it up ...
      self._timer = setInterval(self.doPing, 15000);
    }, 1000);
  }

  doPing() {
    if (this.props.session && !this.props.session.error) {
      this.props.clients.SessionClient.doPing(this.props.session)
    }
  }

  playerConnected(player) {
    return this.props.session.current_round.userStates.filter(state => { return state.user === player.id && state.connected }).length > 0
  }

  playersConnected() {
    return this.props.session.players.filter(player => { return player.role !== "admin" }).length === this.props.session.current_round.userStates.filter(state => { return state.connected }).length
  }

  handlePlay(e) {
    e.preventDefault()
    var self=this
    this.setState({loading: true}, function() {
      self.startPolling()
    })
    //if (this.props.onNext) this.props.onNext()
  }

  handleNext(e) {
    e.preventDefault()
    this.props.clients.SessionClient.battleGo()
    //if (this.props.onNext) this.props.onNext()
  }


}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients || {}
  }
}

export default connect(mapStateToProps)(Explanations)
