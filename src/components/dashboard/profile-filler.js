import React from "react"

import UserClient from 'clients/user'

import {Grid, Row, Col} from "react-bootstrap"
import Form from 'components/utils/form'

class ProfileFiller extends React.Component {

  constructor(props) {
    super(props);

    this.fields = [
      {
        name: "firstname",
        title: "Entrez votre prénom",
        label: "Prénom",
        placeholder: "Prénom",
        type: "text",
        required: true
      },
      {
        name: "lastname",
        label: "Nom",
        title: "Entrez votre nom",
        placeholder: "Nom",
        type: "text",
        required: true
      },
      {
        name: "pseudo",
        label: "Pseudo",
        title: "Choississez un pseudo",
        placeholder: "Pseudo",
        type: "text",
        required: true
      },
      {
        name: "password",
        label: "Mot de passe",
        title: "Entrez votre mot de passe",
        placeholder: "Mot de passe",
        type: "password",
        required: true
      },
      {
        name: "password_confirm",
        label: "Confirmation du mot de passe",
        title: "Confirmation du mot de passe",
        placeholder: "Confirmation du mot de passe",
        type: "password",
        required: true,
        confirmFor: "password"
      },
      {
        name: "cgu",
        label: "J'accepte les condition générales d'utilisation",
        title: "J'accepte les condition générales d'utilisation",
        type: "checkbox",
        required: true,
        wanted: true,
        inputClass:"checkbox",
        className:"test"
      },
      {
        name: "temp",
        type: "hidden",
        defaultValue: false
      }
    ];

    this.state = {
      submitted: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitComplete = this.handleSubmitComplete.bind(this)
  }

  render() {
    return (
      <section className="content" style={{marginLeft: 0}}>
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <h1>Bienvenue sur Open Business Labs !</h1>
              <p>Avant de participer à votre session de jeu, veuillez compléter votre profile en remplissant le formulaire suivant : </p>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Form id="profile-filler-form" 
                    entityId={this.props.me.id}
                    fields={this.fields} 
                    submitLabel="M'enregistrer"
                    submitClass={"btn btn-accent btn-signup"}  
                    onSubmit={this.handleSubmit} 
                    service={{client: UserClient, func: "update"}}
                    onSubmitComplete={this.handleSubmitComplete}
                    onSubmitError={this.handleSubmitError}
              />
            </Col>
          </Row>
        </Grid>
      </section>
    )
  }

  handleSubmit(values) {
  }

  handleSubmitComplete(data) {
    this.setState({submitted: true})
  }

  handleSubmitError(data) {
    console.log("submit error !")
  }

}

export default ProfileFiller
