import React from "react"
import { connect } from 'react-redux'

import UserClient from 'clients/user'
import AreaClient from 'clients/area'

import BaseItem from "../base-item"
import Form from 'components/utils/form'

class Mobility extends BaseItem {

  constructor(props) {
    super(props)

    this.label = "Mobilité"
  }

  componentWillMount() {
    AreaClient.areas()
  }

  buildFullContent() {
    return (
      <div>
        <Form id="user-mobilities-form"
              entityId={this.props.entity.id}
              fields={[
                {
                  name: "areas",
                  label: "Votre mobilité",
                  type: "list-selector",
                  placeholder: "Sélectionnez une région pour l'ajouter",
                  values: this.props.areas,
                  listKey: "id",
                  listValue: "name",
                  required: true,
                  defaultValue: this.props.entity.areas.map(area => {return area.id})
                },
              ]}
              service={{client: UserClient, func: "update"}}
              onSubmitComplete={this.handleSubmitComplete}
        />
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    areas: state.areaState.areas || []
  }
}

export default connect(mapStateToProps)(Mobility)
