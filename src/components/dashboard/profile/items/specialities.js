import React from "react"
import { connect } from 'react-redux'

import BaseItem from "../base-item"
import { Form } from 'codekraft-react-frontend'

class Specialities extends BaseItem {

  constructor(props) {
    super(props)

    this.label = "Spécialités"
  }

  componentDidMount() {
    this.props.clients.SpecialityClient.fetchAll()
  }

  buildFullContent() {
    return (
      <div>
        <Form id="user-specialities-form"
              entityId={this.props.entity.id}
              fields={[
                {
                  name: "specialities",
                  label: "Indiquez vos spécialités",
                  type: "list-selector",
                  placeholder: "Sélectionnez une spécialité pour l'ajouter",
                  values: this.props.specialities,
                  listKey: "id",
                  listValue: "name",
                  required: true,
                  defaultValue: this.props.entity.specialities.map(speciality => {return speciality.id})
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
    specialities: state.specialityState.specialities || [],
    clients: state.bootstrap.clients
  }
}

export default connect(mapStateToProps)(Specialities)
