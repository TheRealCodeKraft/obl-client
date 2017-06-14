import React from "react"

import { Redirect } from "react-router-dom"

import Form from 'components/utils/form'
import UserClient from 'clients/user'

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    }

    this.fields = [
      {
        name: "email",
        label: "Email",
        placeholder: "Email",
        type: "text",
        required: true
      },
      {
        name: "password",
        label: "Password",
        placeholder: "Password",
        type: "password",
        required: true
      },
    ]

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitComplete = this.handleSubmitComplete.bind(this)
  }

  render() {
    if (this.state.loggedIn) return <Redirect to="/dashboard" />
    return (
      <Form id="login-form" 
            fields={this.fields} 
            submitLabel="M'enregistrer" 
            onSubmit={this.handleSubmit} 
            service={{client: UserClient, func: "login"}}
            onSubmitComplete={this.handleSubmitComplete}
            onSubmitError={this.handleSubmitError}
        />
    )
  }

  handleSubmit(values) {
  }

  handleSubmitComplete(data) {
    this.setState({loggedIn: true})
  }

  handleSubmitError(data) {
  }
}

export default Login;
