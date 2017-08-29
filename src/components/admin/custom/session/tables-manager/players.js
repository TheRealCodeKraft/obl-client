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
      <div>
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
                  listValue: "fullname",
                  required: true,
                  defaultValue: this.props.session.players.map(user => { return user.id })
                },
                {
                  name: "mails",
                  label: "Saisissez les emails (1 par ligne)",
                  type: "textarea",
                  placeholder: "Saisissez les emails des joueurs à inviter",
                  required: true
                },
              ]}
              service={{client: SessionClient, func: "update"}}
              onSubmitComplete={this.handleSubmitComplete}
              submitClass={"btn btn-accent"}
        />
      </div>
    )
  }

  handleSubmitComplete(data) {
    if (this.props.onFinished) this.props.onFinished();
  }

}

function mapStateToProps(state) {
  return {
    players: state.userState.users || []
  }
}

export default connect(mapStateToProps)(Players)
