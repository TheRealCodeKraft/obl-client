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

      <div className="row profile-field">
                    <div className="col-xs-12">

                        <div className={"panel panel-profile collapsed"}>
                            <div className="panel-heading">
                                <div className="panel-tools">
                                    <a href="#" className={"panel-toggle-profile"} onClick={this.handleToggleOpen}>{this.state.opened ? <i className={"fa fa-times text-warning"}></i> : <i className={"fa fa-pencil text-warning"}></i>}</a>
                                </div>
                                {this.label}
                                {!this.state.opened ? <div>{this.buildValue()}</div> : null}
                            </div>
                        </div>
          
                        <div className="panel-body">
                          {this.state.opened ? this.buildFullContent() : null}
                        </div>

                    </div>
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
