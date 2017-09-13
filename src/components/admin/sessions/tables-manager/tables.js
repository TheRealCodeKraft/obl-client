import React from "react"
import { connect } from 'react-redux'

import SessionClient from 'clients/session'

import { Form } from 'codekraft-react-frontend'

class Tables extends React.Component {

  constructor(props) {
    super(props)

    this.handleSubmitComplete = this.handleSubmitComplete.bind(this)
  }

  componentWillMount() {
  }

  render() {
    return (
      <Form id="session-users-form"
            entityId={this.props.session.id}
            fields={[
              {
                name: "table_seat_count",
                type: "text",
                label: "Nombre de places par table",
                required: true,
                defaultValue: this.props.session.table_seat_count
              }, 
/*
              {
                name: "tables",
                type: "component",
                multiple: true,
                occurences: this.props.session.players.length + "/table_seat_count",
                components: [
                  {
                    name: "title",
                    type: "text",
                    label: "Titre de la table",
                    required: true,
                    defaultValue: "Table",
                  },
                  {
                    name: "players",
                    label: "Sélectionnez les joueurs",
                    type: "list-selector",
                    placeholder: "Sélectionnez les joueurs pour cette table",
                    values: this.props.players,
                    listKey: "id",
                    listValue: "firstname lastname",
                    required: true,
                    defaultValue: this.props.session.users
                  }
                ],
              }
*/
            ]}
            service={{client: SessionClient, func: "update"}}
            onSubmitComplete={this.handleSubmitComplete}
            submitClass={"btn btn-accent"}
      />
    )
  }

  handleSubmitComplete(data) {
  }

}

function mapStateToProps(state) {
  return {
    players: state.userState.users || []
  }
}

export default connect(mapStateToProps)(Tables)
