import React from "react"
import { connect } from 'react-redux'

import BaseItem from "../base-item"
import { Form } from 'codekraft-react-frontend'

class School extends BaseItem {

  constructor(props) {
    super(props)

    this.label = "Ecole"
  }

  componentDidMount() {
    this.props.clients.SchoolClient.fetchAll()
  }

  buildFullContent() {
    return (
      <div>
        <Form id="user-school-form"
              entityId={this.props.entity.id}
              fields={[
                {
                  name: "school_id",
                  label: "Indiquez votre école",
                  placeholder: "Aucune école",
                  type: "select",
                  values: this.props.schools,
                  key: "id",
                  value: "name",
                  required: true,
                  defaultValue: this.props.entity.school ? this.props.entity.school.id : null
                },
              ]}
              service={{client: this.props.clients.UserClient, func: "update"}}
              onSubmitComplete={this.handleSubmitComplete}
              submitClass={"btn btn-accent"}
        />
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    schools: state.schoolState.schools || [],
    clients: state.bootstrap.clients
  }
}

export default connect(mapStateToProps)(School)
