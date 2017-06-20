import React from "react"

class BaseItem extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      opened: false
    }

    this.handleToggleOpen = this.handleToggleOpen.bind(this)
  }

  render() {
    return (
      <div>
        <div>
          <a href="#" onClick={this.handleToggleOpen}>Open</a>
          <span>{this.label}</span>
          {!this.state.opened ? <span>{this.buildValue()}</span> : null}
        </div>
        {this.state.opened ? this.buildFullContent() : null}
      </div>
    )
  }

  buildValue() {
    return "Value not set"
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

}

export default BaseItem
