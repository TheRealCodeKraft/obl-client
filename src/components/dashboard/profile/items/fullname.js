import React from "react"
import { connect } from 'react-redux'

import BaseItem from "../base-item"
import { Form } from 'codekraft-react-frontend'

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
                  label: "Modifier votre nom",
                  placeholder: "Nom",
                  type: "text",
                  required: true,
                  defaultValue: this.props.entity.lastname
                },
                {
                  name: "firstname",
                  label: "Prénom",
                  placeholder: "Modifier votre prénom",
                  type: "text",
                  required: true,
                  defaultValue: this.props.entity.firstname
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
    clients: state.bootstrap.clients || {}
  }
}

export default connect(mapStateToProps)(PIFullname)
