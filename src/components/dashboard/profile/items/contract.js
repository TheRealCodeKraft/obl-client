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
                  label: "Vous recherchez un CDI : ",
                  type: "switch",
                  values: [{value: true, label: "Oui"}, {value: false, label: "Non"}],
                  required: true,
                  defaultValue: this.props.entity.contract
                },
              ]}
              service={{client: UserClient, func: "update"}}
              onSubmitComplete={this.handleSubmitComplete}
              submitClass={"btn btn-accent"}
        />

      </div>
    )
  }

  buildValue() {
    var value = this.props.entity.contract
    if (value) value = <mark className="mark-green">Oui</mark>
    else value = <mark className="mark-red">Non</mark>
    return value
  }

}

export default Contract
