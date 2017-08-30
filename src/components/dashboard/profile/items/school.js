import React from "react"
import { connect } from 'react-redux'

import UserClient from 'clients/user'
import SchoolClient from 'clients/school'

import BaseItem from "../base-item"
import Form from 'components/utils/form'

class School extends BaseItem {

  constructor(props) {
    super(props)

    this.label = "Ecole"
  }

  componentWillMount() {
    SchoolClient.fetchAll()
  }

  buildFullContent() {
    return (
      <div>
        <Form id="user-school-form"
              entityId={this.props.entity.id}
              fields={[
                {
                  name: "school_id",
                  label: "Indiquez votre écoles",
                  placeholder: "Aucune école",
                  type: "select",
                  values: this.props.schools,
                  key: "id",
                  value: "name",
                  required: true,
                  defaultValue: this.props.entity.school ? this.props.entity.school.id : null
                },
              ]}
              service={{client: UserClient, func: "update"}}
              onSubmitComplete={this.handleSubmitComplete}
              submitClass={"btn btn-accent"}
        />
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    schools: state.schoolState.schools || []
  }
}

export default connect(mapStateToProps)(School)
