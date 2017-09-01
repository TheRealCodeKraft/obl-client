import React from "react"

import ClueClient from 'clients/clue'

import { Grid, Row, Col } from 'react-bootstrap'

import Form from 'components/utils/form'

class QrCodes extends React.Component {

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Form id="scenario-qrcodes-form"
              entityId={this.props.clue.id}
              fields={[
                {
                  name: "qrcodes",
                  label: "Gérez les QR Codes",
                  type: "list-selector",
                  tags: true,
                  placeholder: "Entrez un QR Code pour l'ajouter à la liste",
                  required: true,
                  defaultValue: this.props.clue.qrcodes
                } 
              ]}
              service={{client: ClueClient, func: "update"}}
              submitClass={"btn btn-accent"}
            />
          </Col>
        </Row>
      </Grid>
    )
  }

}

export default QrCodes
