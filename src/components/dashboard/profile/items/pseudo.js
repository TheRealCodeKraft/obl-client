import React from "react"
import { connect } from 'react-redux'

import BaseItem from "../base-item"
import { Form } from 'codekraft-react-frontend'

class Pseudo extends BaseItem {

  constructor(props) {
    super(props)

    this.label = "Pseudo"
  }

  buildFullContent() {
    return (
      <div>
        <Form id="user-pseudo-form"
              entityId={this.props.entity.id}
              fields={[
                {
                  name: "pseudo",
                  label: "Modifier votre pseudo",
                  placeholder: "Pseudo",
                  type: "text",
                  required: true,
                  defaultValue: this.props.entity.pseudo
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

export default connect(mapStateToProps)(Pseudo)
