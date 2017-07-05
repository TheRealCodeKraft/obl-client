import React from "react"
import configs from 'config'

class AdminPageListRow extends React.Component {

  constructor(props) {
    super(props)

    this.handleDelete = this.handleDelete.bind(this)
    this.handleSee = this.handleSee.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  render() {
    var row = [], attribute = undefined, name = undefined
    for (var attrIndex in this.props.attributes) {
      attribute = this.props.attributes[attrIndex]
      if (attribute instanceof Object) {
        name = attribute.name
      } else {
        name = attribute
      }
      if (this.props.attributes[attrIndex]) {
        row.push(<div key={"row-" + this.props.item.id + "-attr-" + attrIndex}>{this.buildDisplayValue(name, attribute)}</div>)
      }
    }
    row.push(this.buildActions(this.props.item))
  
    return <div style={{display: "flex"}}>{row}</div>
  }

  buildDisplayValue(name, attribute) {
   var value = this.props.item[name]

   if (attribute instanceof Object && attribute.link) {
    var link = attribute.link.replace("[[VALUE]]", value)
    if (link.indexOf("[[MOODLE_URL]]") !== -1) {
      link = link.replace("[[MOODLE_URL]]", configs.moodle.url)
    }
    value = <a href={link} target="_blank">{value}</a>
   }

   return value
  }

  buildActions() {
    var actions = []
    if (!this.props.actions) {
      actions.push(<a key="action-delete" href="#" onClick={this.handleDelete}>supprimer</a>)
      actions.push(<a key="action-see" href="#" onClick={this.handleSee}>voir</a>)
      actions.push(<a key="action-edit" href="#" onClick={this.handleEdit}>modifier</a>)
    } else {
      this.props.actions.map(action => {
        if (action instanceof Object) {
          actions.push(<a key={"action-" + action} onClick={this.handleCustomAction.bind(this, action)}>{action.label}</a>)
        } else {
          switch(action) {
            case "delete":
              actions.push(<a key="action-delete" href="#" onClick={this.handleDelete}>supprimer</a>)
              break;
            case "see":
              actions.push(<a key="action-see" href="#" onClick={this.handleSee}>voir</a>)
              break;
            case "edit":
              actions.push(<a key="action-edit" href="#" onClick={this.handleEdit}>modifier</a>)
              break;
          }
        }
      })
    }
    return <div>{actions}</div>
  }

  handleDelete(e) {
    e.preventDefault()
    if (this.props.onDelete) this.props.onDelete(this.props.item.id)
  }

  handleSee(e) {
    e.preventDefault()
    if (this.props.onSee) this.props.onSee(this.props.item.id)
  }

  handleEdit(e) {
    e.preventDefault()
    if (this.props.onEdit) this.props.onEdit(this.props.item.id)
  }

  handleCustomAction(action, e) {
    e.preventDefault()
    if (this.props.onCustomAction) this.props.onCustomAction(this.props.item.id, action)
  }

}

export default AdminPageListRow
