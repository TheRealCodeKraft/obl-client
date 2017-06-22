import React from "react"

import UserClient from 'clients/user'

import BaseItem from "../base-item"
import Form from 'components/utils/form'

class Traineeship extends BaseItem {

  constructor(props) {
    super(props)

    this.label = "Stage recherché"
  }

  buildFullContent() {
    return (
      <div>
        <Form id="user-traineeship-form"
              entityId={this.props.entity.id}
              fields={[
                {
                  name: "traineeship",
                  label: "Stage recherché",
                  type: "radio",
                  values: [{value: true, label: "Oui"}, {value: false, label: "Non"}],
                  required: true,
                  defaultValue: this.props.entity.traineeship
                },
              ]}
              service={{client: UserClient, func: "update"}}
              onSubmitComplete={this.handleSubmitComplete}
        />

      </div>
    )
  }

}

export default Traineeship
