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
                  label: "Vous recherchez un stage : ",
                  type: "switch",
                  values: [{value: true, label: "Oui"}, {value: false, label: "Non"}],
                  required: true,
                  defaultValue: this.props.entity.traineeship
                },
                {
                  name: "traineeship_start_ts",
                  label: "Date de début",
                  type: "date",
                  required: false,
                  defaultValue: this.props.entity.traineeship_start_ts,
                  displayIf: {
                    name: "traineeship",
                    value: true
                  }
                },
                {
                  name: "traineeship_end_ts",
                  label: "Date de fin",
                  type: "date",
                  required: false,
                  defaultValue: this.props.entity.traineeship_end_ts,
                  displayIf: {
                    name: "traineeship",
                    value: true
                  }
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
    var value = this.props.entity.traineeship
    if (value) value = <mark className="mark-green">Oui</mark>
    else value = <mark className="mark-red">Non</mark>
    return value
  }

}

export default Traineeship
