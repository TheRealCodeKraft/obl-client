import React from "react"

class AdminPageListRow extends React.Component {

  constructor(props) {
    super(props)

    this.handleDelete = this.handleDelete.bind(this)
    this.handleSee = this.handleSee.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  render() {
    var row = [], name = undefined
    for (var attrIndex in this.props.attributes) {
      name = this.props.attributes[attrIndex]
      if (name instanceof Object) {
        name = name.name
      }
      if (this.props.attributes[attrIndex]) {
        row.push(<div key={"row-" + this.props.item.id + "-attr-" + attrIndex}>{this.props.item[name]}</div>)
      }
    }
    row.push(this.buildActions(this.props.item))
  
    return <div style={{display: "flex"}}>{row}</div>
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
