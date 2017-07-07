import React from "react"

class SessionLauncher extends React.Component {

  constructor(props) {
    super()

    this.handleLaunch = this.handleLaunch.bind(this)
    this.handleLaunched = this.handleLaunched.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="col-xs-4">
          <img src={this.props.entity.game.picture} />
        </div>
        <div className="col-xs-8">
          <span>{this.getMessage()}</span>
          <button onClick={this.handleLaunch}>Oui</button>
          <button onClick={this.handleCancel}>Non</button>
        </div>
      </div>
    )
  }

  getMessage() {
    var message = <span>Êtes-vous sûr de vouloir <strong>lancer</strong> la session <strong>{this.props.entity.title}</strong> ?</span>
    if (this.props.entity.current_step !== "sleeping" && this.props.entity.current_step !== "done") {
      message = <span>Êtes-vous sûr de vouloir <strong>mettre en pause</strong> la session <strong>{this.props.entity.title}</strong> ?</span>
    }
    return message
  }

  handleLaunch() {
    this.setState({launching: true}, function() {
      if (this.props.entity.playable == "play") {
        this.props.client.pause(this.props.entity.id, this.handleLaunched)
      } else {
        this.props.client.launch(this.props.entity.id, this.handleLaunched)
      }
    })
  }

  handleCancel() {

  }

  handleLaunched(data) {
    this.setState({launching: false}, function() {
      if (this.props.onFinished) this.props.onFinished(data)
    })
  }

}

export default SessionLauncher
