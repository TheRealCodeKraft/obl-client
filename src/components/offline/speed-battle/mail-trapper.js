import React from "react"

import { connect } from 'react-redux'

import { Form } from 'codekraft-react-frontend'

class MailTrapper extends React.Component {

  render() {
    if (this.props.userState.email) {
      return (
        <div>
          <hr />
          <span>Vous recevrez prochainement votre score dans votre boite {this.props.userState.email}</span>
          <hr style={{borderTop: "1px solid #F8F8F7"}} />
        </div>
      )
    } else {
      return (
        <div>
          <hr />
          Pour participer au tirage au sort et en savoir plus sur les opportunités métier, renseigne ton email ci-dessous :
          <Form id="connexion-form" 
              fields={[{
                name: "email",
                label: "Email",
                title: "Email",
                placeholder: "Votre email",
                type: "email",
                required: true
              }]} 
              submitLabel="Envoyer" 
              onSubmit={this.handleSubmit}
              submitClass={"btn btn-accent"} 
              service={{client: this.props.clients.SessionClient, func: "setRoundPlayerEmail"}}
              onSubmitComplete={this.handleSubmitComplete}
          />
          <hr style={{borderTop: "1px solid #F8F8F7"}} />

        </div>
      )
    }
  }

}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients || {}
  }
}

export default connect(mapStateToProps)(MailTrapper)
