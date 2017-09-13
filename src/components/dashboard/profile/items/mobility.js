import React from "react"
import { connect } from 'react-redux'

import BaseItem from "../base-item"
import { Form } from 'codekraft-react-frontend'

class Mobility extends BaseItem {

  constructor(props) {
    super(props)

    this.label = "Mobilité"
  }

  componentDidMount() {
console.log(this.props)
    this.props.clients.AreaClient.fetchAll()
  }

  buildFullContent() {
    return (
      <div>
        <Form id="user-mobilities-form"
              entityId={this.props.entity.id}
              fields={[
                {
                  name: "areas",
                  label: "Quelle est votre mobilité ?",
                  type: "list-selector",
                  placeholder: "Sélectionnez une région pour l'ajouter",
                  values: this.props.areas,
                  listKey: "id",
                  listValue: "name",
                  required: true,
                  defaultValue: this.props.entity.areas.map(area => {return area.id})
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
    areas: state.areaState.areas || [],
    clients: state.bootstrap.clients
  }
}

export default connect(mapStateToProps)(Mobility)
