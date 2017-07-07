import React from "react"

import UserClient from 'clients/user'

import BaseItem from "../base-item"
import Form from 'components/utils/form'

class Email extends BaseItem {

  constructor(props) {
    super(props)

    this.label = "Email"
  }

  buildFullContent() {
    return (
      <div>
        <Form id="user-email-form"
              entityId={this.props.entity.id}
              fields={[
                {
                  name: "email",
                  label: "Modifier votre email",
                  placeholder: "Email",
                  type: "email",
                  required: true,
                  defaultValue: this.props.entity.email
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

export default Email
