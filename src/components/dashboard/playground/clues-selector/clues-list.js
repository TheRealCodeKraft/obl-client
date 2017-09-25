import React from "react"

import { Grid, Row, Col, Table, Alert } from 'react-bootstrap';

class CluesList extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      show_alert:true
    }

    this.handleHideAlert = this.handleHideAlert.bind(this)

  }

  render() {
    return (
              <Grid fluid>
                <Table className="indices">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Décideur</th>
                      <th>Information client</th>
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
                    {
                      this.props.show_alert !== false && this.state.show_alert
                      ? <Alert bsStyle="danger" onDismiss={this.handleHideAlert}>
                          <h4>Attention !</h4>
                          <h5>Faites une copie de vos informations client collectées ou prenez-les en note. Vous ne pourrez plus y accéder quand vous aurez commencé le jeu vidéo.</h5>
                        </Alert>
                      : null
                    }
                  </Col>
                </Row>
              </Grid>

    )
  }

  handleHideAlert() {
    this.setState({show_alert:false})
  }

}

export default CluesList
