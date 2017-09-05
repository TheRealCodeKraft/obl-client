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
    var fields=[
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
    }]

    if (this.props.session.playable === "to_launch" || (this.props.session.playable === "pause" && this.props.session.rounds.length == 1 && this.props.session.current_step == "waiting_players")) {
      fields[0].label = ""
      fields[0].removeOnly = true
      fields.push({
        name: "mails",
        label: "Saisissez les emails (1 par ligne)",
        type: "textarea",
        placeholder: "Saisissez les emails des joueurs à inviter",
        required: true
      })
    }

    return (
      <div>
        <Form id="session-users-form"
              entityId={this.props.session.id}
              fields={fields}
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
