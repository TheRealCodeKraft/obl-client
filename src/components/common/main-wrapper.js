import React from 'react'
import { withRouter } from "react-router"
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { Grid, Row, Col, Panel } from 'react-bootstrap';

class MainWrapper extends React.Component {

  render() {

    console.log(this.props.location.pathname)
    if (this.props.me && this.props.me.robot && this.props.location.pathname !== "/speed-battle") {
      return (
        <section className={(this.props.config && this.props.config.mainSectionClass) ? this.props.config.mainSectionClass : "content"}>
          <Grid className="container-center animated slideInDown">
             <Row className="view-header">
              <div className={"header-icon"}>
                <i className={"pe page-header-icon pe-7s-close-circle"}></i>
              </div>
              <div className={"header-title"}>
                  <h3>Accès impossible</h3>
                  <small>
                    Vous ne pouvez pas accéder à l'interface en tant que robot
                  </small>
              </div>
            </Row>

            <Panel className="panel panel-filled">
               <Link className={"btn btn-default btn-play"} to="/speed-battle">Rejoindre le battle</Link>
            </Panel>

          </Grid>
        </section>
      )
    } else {
      return (
        <section className={(this.props.config && this.props.config.mainSectionClass) ? this.props.config.mainSectionClass : "content"} >
          {this.props.children}
        </section>
      )
    }
  }

}

function mapStateToProps(state) {
  return {
    me: state.userState.me || null
  }
}

export default withRouter(connect(mapStateToProps)(MainWrapper))
