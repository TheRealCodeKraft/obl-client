import React from "react"
import { connect } from 'react-redux'

import BaseItem from "../base-item"
import { Form } from 'codekraft-react-frontend'

import Moment from 'react-moment'

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
              service={{client: this.props.clients.UserClient, func: "update"}}
              onSubmitComplete={this.handleSubmitComplete}
              submitClass={"btn btn-accent"}
        />

      </div>
    )
  }

  buildValue() {
    var value = this.props.entity.traineeship
    var values = []
    if (this.props.entity.traineeship) {
      values.push(<mark className="mark-green">Oui</mark>)
    } else {
      values.push(<mark className="mark-red">Non</mark>)
    }

    if (this.props.entity.traineeship_start_ts) {
      if (this.props.entity.traineeship_end_ts) {
        values.push(<span>&nbsp;Du <Moment format="DD/MM/YYYY">{this.props.entity.traineeship_start_ts}</Moment> au <Moment format="DD/MM/YYYY">{this.props.entity.traineeship_end_ts}</Moment></span>)
      } else {
        values.push(<span>&nbsp;A partir du <Moment format="DD/MM/YYYY">{this.props.entity.traineeship_start_ts}</Moment></span>)
      }
    }

    return values
  }

}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients
  }
}

export default connect(mapStateToProps)(Traineeship)
