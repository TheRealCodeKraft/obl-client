import React from "react"

import ClueClient from 'clients/clue'

import { Grid, Row, Col } from 'react-bootstrap'

import Form from 'components/utils/form'

class QrCodes extends React.Component {

  constructor(props) {
    super(props)
    this.handleSubmitComplete = this.handleSubmitComplete.bind(this)
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Form id="scenario-qrcodes-form"
              entityId={this.props.entity.id}
              fields={[
                {
                  name: "qrcodes",
                  label: "Gérez les QR Codes",
                  type: "list-selector",
                  tags: true,
                  placeholder: "Entrez un QR Code pour l'ajouter à la liste",
                  required: true,
                  defaultValue: this.props.entity.qrcodes
                } 
              ]}
              service={{client: ClueClient, func: "update"}}
              submitClass={"btn btn-accent"}
              onSubmitComplete={this.handleSubmitComplete}
            />
          </Col>
        </Row>
      </Grid>
    )
  }

  handleSubmitComplete(data) {
    if (!data.error) {
      if (this.props.onFinished) this.props.onFinished()
    }
  }

}

export default QrCodes
