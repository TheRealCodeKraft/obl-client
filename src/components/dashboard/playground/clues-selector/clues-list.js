import React from "react"

import { Grid, Row, Col, Table, Alert, Button } from 'react-bootstrap';

class CluesList extends React.Component {

  render() {
    return (
              <Grid fluid>
                <Table className="indices">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Décideur</th>
                      <th>Indice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.clues.map(clue => {
                      return (
                        <tr>
                          <td>{clue.i18nfamily}</td>
                          <td>Tous</td>
                          <td>{clue.description}</td>
                        </tr>
                      )})
                    }
                  </tbody>
                </Table>

                <Row>
                  <Col xs={12}>
                    <Alert bsStyle="warning">
                      <h4>Attention !</h4>
                      <p>Faites une copie de vos indices collectés ou prenez-les en note. Vous ne pourrez plus y accéder quand vous aurez commencé le jeu vidéo.</p>
                    </Alert>
                  </Col>
                </Row>
              </Grid>

    )
  }

}

export default CluesList
