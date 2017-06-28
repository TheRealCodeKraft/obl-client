import React from "react"

class Session extends React.Component {

  constructor(props) {
    super(props)
    
    this.goToSession = this.goToSession.bind(this)
  }

  render() {
    return (
      <div className="session">
        <span>{this.props.session.title}</span>
{/*
        <span>{this.props.session.sessionTitle}</span>
        <a href="#" onClick={this.goToSession}>{this.getButtonLabel()}</a>
*/}
      </div>
    )
  }

  goToSession(e) {
    e.prevenDefault()
  }

}

export default Session
