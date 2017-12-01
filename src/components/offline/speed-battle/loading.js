import React from "react"

import { Grid, Row, Col, Panel, Table } from 'react-bootstrap';

class Loading extends React.Component {

  render() {
    return (
      <Grid className="container-center animated slideInDown">
         <Row className="view-header">
          <div className={"header-icon"}>
              <i className={"pe page-header-icon pe-7s-download"}></i>
          </div>
          <div className={"header-title"}>
              <h3>Chargement</h3>
              <small>
                Recherche d'une session en cours
              </small>
          </div>
        </Row>
      </Grid>
    )
  }

}

export default Loading
