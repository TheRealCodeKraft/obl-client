import React from "react"

import {Row, Col, Panel} from "react-bootstrap"

class BaseItem extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      open: false
    }

    this.handleToggle = this.handleToggle.bind(this)
    this.handleSubmitComplete= this.handleSubmitComplete.bind(this)
  }

  render() {
    return (
      <Row className="profile-field">
        <Col xs={12}>
        <Panel header={this.buildHeader()} collapsible expanded={this.state.open} className={"panel-profile" + (this.state.open ? " panel-filled" : "")} bsStyle="">
          {this.buildFullContent()}
        </Panel>
        </Col>
      </Row>
    )
  }

  buildHeader() {
    var header = []
    header.push(<div className="panel-tools">
                  <a href="#" className="panel-toggle-profile" onClick={this.handleToggle}>
                    {this.state.open 
                     ? <i className={"fa fa-times text-warning"}></i> 
                     : <i className={"fa fa-pencil text-warning"}></i>}
                  </a>
                </div>)
    header.push(this.label)
    header.push(!this.state.opened ? <div>{this.buildValue()}</div> : null)
    return header
  }

  buildValue() {
    return this.props.value ? this.props.value : "Non renseigné"
  }

  buildFullContent() {
    return (
      <span>Full content not built</span>
    )
  }

  handleToggle(e) {
    e.preventDefault()
    this.setState({open: !this.state.open})
  }

  handleSubmitComplete(data) {
    this.setState({open: false})
  }

}

export default BaseItem
