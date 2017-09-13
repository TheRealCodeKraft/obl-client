import React from "react"
import { connect } from 'react-redux'

import BaseItem from "../base-item"
import { Form } from 'codekraft-react-frontend'

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
    clients: state.bootstrap.clients
  }
}

export default connect(mapStateToProps)(Email)
