import React from "react"

import UserClient from 'clients/user'

import BaseItem from "../base-item"
import Form from 'components/utils/form'

class School extends BaseItem {

  constructor(props) {
    super(props)

    this.label = "Ecole"
  }

  buildFullContent() {
    return (
      <div>
        <Form id="user-school-form"
              entityId={this.props.entity.id}
              fields={[
                {
                  name: "school",
                  label: "Ecole",
                  placeholder: "Ecole",
                  type: "text",
                  required: true,
                  defaultValue: this.props.entity.school
                },
              ]}
              service={{client: UserClient, func: "update"}}
              onSubmitComplete={this.handleSubmitComplete}
        />
      </div>
    )
  }

}

export default School
