import React from "react"
import { connect } from 'react-redux'

import SessionClient from 'clients/session'

import WaitingRoom from './playground/waiting-room'

class Playground extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.match.params.identifier != undefined) {
      SessionClient.fetchOne(this.props.match.params.identifier)
    }
  }

  render() {
    if (!this.props.session) {
      return <span>Chargement de la session en cours</span>
    } else {
      return (
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-12 titre-accueil-jeu">
                <div className="panel panel-filled panel-c-warning">
                  <div className="panel-body">
                    <img src={this.props.session.game.picture} className="img-rounded image-lg" alt={this.props.session.game.title} />
                    <h1>{this.props.session.game.title}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                {this.buildSection()}
              </div>
            </div>
          </div>
        </section>
      )
    }
  }

  buildSection() {
    var section = null

    switch(this.props.session.current_step) {
      case "waiting_players":
        section = <WaitingRoom session={this.props.session} />
        break
    }

    return section
  }

}

function mapStateToProps(state) {
  return {
    session: state.sessionState.session || null
  }
}

export default connect(mapStateToProps)(Playground)
