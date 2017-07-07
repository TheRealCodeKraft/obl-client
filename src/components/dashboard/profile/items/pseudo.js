import React from "react"

import UserClient from 'clients/user'

import BaseItem from "../base-item"
import Form from 'components/utils/form'

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
              service={{client: UserClient, func: "update"}}
              onSubmitComplete={this.handleSubmitComplete}
              submitClass={"btn btn-accent"}
        />
      </div>
    )
  }

}

export default Pseudo
