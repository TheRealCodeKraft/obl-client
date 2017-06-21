import React from "react"

import UserClient from 'clients/user'

import BaseItem from "../base-item"
import Form from 'components/utils/form'

class PIFullname extends BaseItem {

  constructor(props) {
    super(props)

    this.label = "Nom complet"
  }

  buildFullContent() {
    return (
      <div>
        <Form id="user-name-form"
              entityId={this.props.entity.id}
              fields={[
                {
                  name: "lastname",
                  label: "Nom",
                  placeholder: "Nom",
                  type: "text",
                  required: true,
                  defaultValue: this.props.entity.lastname
                },
                {
                  name: "firstname",
                  label: "Prénom",
                  placeholder: "Prénom",
                  type: "text",
                  required: true,
                  defaultValue: this.props.entity.firstname
                },
              ]}
              service={{client: UserClient, func: "update"}}
              onSubmitComplete={this.handleSubmitComplete}
        />
      </div>
    )
  }
}

export default PIFullname
