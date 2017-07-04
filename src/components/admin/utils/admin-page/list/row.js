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
console.dir(attribute)
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
    return <div>
             &nbsp;<a href="#" onClick={this.handleDelete}>supprimer</a>
             &nbsp;<a href="#" onClick={this.handleSee}>voir</a>
             &nbsp;<a href="#" onClick={this.handleEdit}>modifier</a>
           </div>
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

}

export default AdminPageListRow
