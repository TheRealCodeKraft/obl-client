import React from "react"

import ScenarioClient from 'clients/scenario'

import Form from 'components/utils/form'

class ArchiveForm extends React.Component {

  constructor(props) {
    super(props)

    this.handleSubmitComplete = this.handleSubmitComplete.bind(this)
  }

  render() {
    return (
      <Form id="scenario-archive-form"
            entityId={this.props.scenario.id}
            fields={[
              {
                "name": "vts_archive",
                "label": "Export Scorm VTS",
                "type": "image-uploader",
                "showImage": false,
                "accept": ".zip"
              }
            ]} 
            values={this.props.scenario}
            submitLabel="none"
            service={{client: ScenarioClient, func: "update"}}
            onSubmitComplete={this.handleSubmitComplete}
            submitClass={"btn btn-accent"} 
      />
    )
  }

  handleSubmitComplete(data) {

  }

}

export default ArchiveForm
