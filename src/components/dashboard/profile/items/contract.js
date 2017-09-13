import React from "react"
import { connect } from 'react-redux'

import BaseItem from "../base-item"
import { Form } from 'codekraft-react-frontend'

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
              service={{client: this.props.clients.UserClient, func: "update"}}
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

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients
  }
}

export default connect(mapStateToProps)(Contract)
