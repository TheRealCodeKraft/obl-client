import React from "react"
import { connect } from 'react-redux'

import SessionClient from 'clients/session'

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
console.log(this.props.session)
      return (
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-12">
                <h1><i className={"pe pe-7s-joy text-warning"}></i>{this.props.session.game.title}</h1>
              </div>
            </div>
          </div>
        </section>
      )
    }
  }

}

function mapStateToProps(state) {
  return {
    session: state.sessionState.session || null
  }
}

export default connect(mapStateToProps)(Playground)
