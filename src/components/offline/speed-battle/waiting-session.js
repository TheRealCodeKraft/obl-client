import React from "react"

import { Grid, Row, Col, Panel, Table } from 'react-bootstrap';

class WaitingSession extends React.Component {

  render() {
    return (
      <Grid className="container-center animated slideInDown">
         <Row className="view-header">
          <div className={"header-icon"}>
              <i className={"pe page-header-icon pe-7s-download"}></i>
          </div>
          <div className={"header-title"}>
              <h3>Prêt !</h3>
              <small>
                Plus qu'à lancer la session
              </small>
          </div>
        </Row>
      </Grid>
    )
  }

}

export default WaitingSession
