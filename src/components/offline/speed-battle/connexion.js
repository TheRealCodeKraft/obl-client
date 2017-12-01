import React from "react"

import { connect } from 'react-redux'

import { Form } from 'codekraft-react-frontend'

import { Grid, Row, Col, Panel } from 'react-bootstrap';

class Connexion extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      stamps: null
    }

    this.fields = [
      {
        name: "code",
        label: "Code",
        title: "Code",
        placeholder: "Code du battle",
        type: "text",
        required: true
      },
      {
        name: "connected",
        type: "hidden",
        defaultValue: "PAF"
      }
    ]
  
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitComplete = this.handleSubmitComplete.bind(this)
  }

  render() {
    this.fields[1]["defaultValue"] = (this.props.me ? true : false)
    if (!this.state.stamps) {
      return this.renderCodeInput()
    } else {
      return this.renderPlayers()
    }
  }

  renderCodeInput() {
    return (
      <Grid className="container-center animated slideInDown">
         <Row className="view-header">
          <div className={"header-icon"}>
              <i className={"pe page-header-icon pe-7s-config"}></i>
          </div>
          <div className={"header-title"}>
              <h3>Association du matériel</h3>
              <small>
                Entrez le code de la session
              </small>
          </div>
        </Row>

        <Panel className="panel panel-filled">
          <Form id="connexion-form" 
              fields={this.fields} 
              submitLabel="Connexion" 
              onSubmit={this.handleSubmit}
              submitClass={"btn btn-accent"} 
              service={{client: this.props.clients.SessionClient, func: "connectBattle"}}
              onSubmitComplete={this.handleSubmitComplete}
          />
        </Panel>
     
      </Grid>
    )
  }

  renderPlayers() {
    return (
      <Grid className="container-center animated slideInDown">
         <Row className="view-header">
          <div className={"header-icon"}>
              <i className={"pe page-header-icon pe-7s-config"}></i>
          </div>
          <div className={"header-title"}>
              <h3>Association du joueur</h3>
              <small>
                Sélectionnez le joueur à associer à ce matériel
              </small>
          </div>
        </Row>

        <Panel className="panel panel-filled">
          <Grid className="container-center" style={{width: "100%", margin: 0}}>
          {this.state.stamps.map(stamp => {
            return (
              <a onClick={this.handleChoosePlayer.bind(this, stamp)}>
                <Row style={{background: "#494B53", borderRadius: "5px", marginBottom: 10}}>
                  <Col xs={4}>
                    <i className={"pe page-header-icon pe-7s-user"} style={{fontSize: "5em", color: "#fff"}}></i>
                  </Col>
                  <Col xs={8} style={{fontSize: "2.5em", paddingTop: 10}}>
                    {stamp.pseudo}
                  </Col>
                </Row>
              </a>
            )
          })}
          </Grid>
        </Panel>
     
      </Grid>
    )
  }

  handleSubmit(values) {
  }

  handleSubmitComplete(data) {
    var self=this;
    if (data["stamp"]) {
      this.connect(data["stamp"].email, data["stamp"].stamp)
    } else if (data["stamps"]) {
      this.setState({stamps: data["stamps"]})
    }
  }

  handleChoosePlayer(stamp, e) {
    e.preventDefault()
    this.connect(stamp.email, stamp.stamp)    
  }

  connect(email, stamp) {
    var self=this
    this.props.clients.ApiClient.login({email: email, password: stamp}, function(data) {
      //this.props.clients.UserClient.me()
      self.setState({loggedIn: true})
    }) 

  }

}

function mapStateToProps(state) {
  return {
    me: state.userState.me || null,
    clients: state.bootstrap.clients || {}
  }
}

export default connect(mapStateToProps)(Connexion)
