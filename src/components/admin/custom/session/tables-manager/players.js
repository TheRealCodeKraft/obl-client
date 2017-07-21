import React from "react"
import { connect } from 'react-redux'

import SessionClient from 'clients/session'
import UserClient from 'clients/user'

import Form from 'components/utils/form'

class Players extends React.Component {

  constructor(props) {
    super(props)

    this.handleSubmitComplete = this.handleSubmitComplete.bind(this)
  }

  componentWillMount() {
    UserClient.fetchAll()
  }

  render() {
    return (
      <Form id="session-users-form"
            entityId={this.props.session.id}
            fields={[
              {
                name: "players",
                label: "Sélectionnez les joueurs",
                type: "list-selector",
                placeholder: "Sélectionnez les joueurs pour cette session",
                values: this.props.players,
                listKey: "id",
                listValue: "firstname lastname",
                required: true,
                defaultValue: this.props.session.players.map(user => { return user.id })
              },
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

export default connect(mapStateToProps)(Players)
