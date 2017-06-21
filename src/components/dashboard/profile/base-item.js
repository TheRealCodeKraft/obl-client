import React from "react"

class BaseItem extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      opened: false
    }

    this.handleToggleOpen = this.handleToggleOpen.bind(this)
    this.handleSubmitComplete= this.handleSubmitComplete.bind(this)
  }

  render() {
    return (
      <div>
        <div>
          <a href="#" onClick={this.handleToggleOpen}>{this.state.opened ? "Close" : "Open"}</a>
          &nbsp;&nbsp;<span>{this.label}</span>
          {!this.state.opened ? <strong>&nbsp;&nbsp;{this.buildValue()}</strong> : null}
        </div>
        {this.state.opened ? this.buildFullContent() : null}
      </div>
    )
  }

  buildValue() {
    return this.props.value ? this.props.value : "Non renseigné"
  }

  buildFullContent() {
    return (
      <span>Full content not built</span>
    )
  }

  handleToggleOpen(e) {
    e.preventDefault()
    this.setState({opened: !this.state.opened})
  }

  handleSubmitComplete(data) {
    this.setState({opened: false})
  }

}

export default BaseItem
