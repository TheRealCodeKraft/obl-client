import React from "react"

import { Redirect } from "react-router-dom"

import Form from 'components/utils/form'
import { Link } from 'react-router-dom'
import Auth from 'clients/auth'

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      error: false,
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
      
      <div className={"container-center animated slideInDown"}>

            <div className={"view-header"}>
                <div className={"header-icon"}>
                    <i className={"pe page-header-icon pe-7s-unlock"}></i>
                </div>
                <div className={"header-title"}>
                    <h3>Login</h3>
                    <small>
                        Entrez vos identifiants pour vous connecter.
                    </small>
                </div>
            </div>

            <div className={"panel panel-filled"}>
                <div className={"panel-body"}>
                    
                    <Form id="login-form" 
                        fields={this.fields} 
                        submitLabel="Me connecter" 
                        onSubmit={this.handleSubmit} 
                        service={{client: Auth, func: "login"}}
                        onSubmitComplete={this.handleSubmitComplete}
                    />
                    <Link className={"btn btn-default"} to="/signup">Créer un compte</Link>

                </div>
            </div>

            <div className={"text-center small"}>
                    <Link to="/">Mot de passe oublié</Link>
            </div>

        </div>
    )
  }

  handleSubmit(values) {
  }

  handleSubmitComplete(data) {
    this.setState({loggedIn: true})
  }
}

export default Login;
