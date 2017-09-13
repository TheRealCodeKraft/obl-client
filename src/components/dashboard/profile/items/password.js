import React from "react"
import { connect } from 'react-redux'

import BaseItem from "../base-item"
import { Form } from 'codekraft-react-frontend'

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
              service={{client: this.props.clients.UserClient, func: "updatePassword"}}
              onSubmitComplete={this.handleSubmitComplete}
              submitClass={"btn btn-accent"}
        />
      </div>
    )
  }


}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients
  }
}

export default connect(mapStateToProps)(Password)
