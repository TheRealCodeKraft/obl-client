import React from "react"
import { connect } from 'react-redux'

import UserClient from 'clients/user'
import SpecialityClient from 'clients/speciality'

import BaseItem from "../base-item"
import Form from 'components/utils/form'

class Specialities extends BaseItem {

  constructor(props) {
    super(props)

    this.label = "Spécialités"
  }

  componentWillMount() {
    SpecialityClient.fetchAll()
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
              service={{client: UserClient, func: "update"}}
              onSubmitComplete={this.handleSubmitComplete}
              submitClass={"btn btn-accent"}
        />
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    specialities: state.specialityState.specialities || []
  }
}

export default connect(mapStateToProps)(Specialities)
