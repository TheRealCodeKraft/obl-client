import React from "react"

import UserClient from 'clients/user'

import BaseItem from "../base-item"
import Form from 'components/utils/form'

class Password extends BaseItem {

  constructor(props) {
    super(props)

    this.label = "Mot de passe"
  }

  buildFullContent() {
    return (
      <div>
        <Form id="user-password-form"
              entityId={this.props.entity.id}
              fields={[
                {
                  name: "password",
                  label: "Modifier votre mot de passe",
                  placeholder: "Mot de passe",
                  type: "password",
                  required: true
                },
                {
                  name: "password_confirm",
                  label: "Confirmation votre nouveau mot de passe",
                  placeholder: "Confirmation votre nouveau mot de passe",
                  type: "password",
                  required: true,
                  confirmFor: "password"
                },
              ]}
              service={{client: UserClient, func: "updatePassword"}}
              onSubmitComplete={this.handleSubmitComplete}
              submitClass={"btn btn-accent"}
        />
      </div>
    )
  }


}

export default Password
