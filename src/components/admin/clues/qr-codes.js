import React from "react"
import { connect } from 'react-redux'

import { Grid, Row, Col } from 'react-bootstrap'

import { Form } from 'codekraft-react-frontend'

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
                },
                {
                  name: "raw_qrcodes",
                  label: "Saisissez les QR Codes (1 par ligne)",
                  type: "textarea",
                  placeholder: "Saisissez les QR Codes susceptibles de débloquer l'indice",
                  required: true
                }
              ]}
              service={{client: this.props.clients.ClueClient, func: "update"}}
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

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients || {}
  }
}

export default connect(mapStateToProps)(QrCodes)
