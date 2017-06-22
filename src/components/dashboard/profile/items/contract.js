import React from "react"

import UserClient from 'clients/user'

import BaseItem from "../base-item"
import Form from 'components/utils/form'

class Contract extends BaseItem {

  constructor(props) {
    super(props)

    this.label = "CDI Recherché"
  }

  buildFullContent() {
    return (
      <div>
        <Form id="user-contract-form"
              entityId={this.props.entity.id}
              fields={[
                {
                  name: "contract",
                  label: "CDI recherché",
                  type: "radio",
                  values: [{value: true, label: "Oui"}, {value: false, label: "Non"}],
                  required: true,
                  defaultValue: this.props.entity.contract
                },
              ]}
              service={{client: UserClient, func: "update"}}
              onSubmitComplete={this.handleSubmitComplete}
        />

      </div>
    )
  }

}

export default Contract
