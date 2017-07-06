import React from "react"
import configs from 'config'

class AdminPageListRow extends React.Component {

  constructor(props) {
    super(props)

    this.handleDelete = this.handleDelete.bind(this)
    this.handleSee = this.handleSee.bind(this)
    this.handleEdit = this.handleEdit.bind(this)

    this.tableRowStyles = {
      display: "table-row"
    }

    this.tableCellStyles = {
      display: "table-cell",
      padding: 5
    }
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
        row.push(<div key={"row-" + this.props.item.id + "-attr-" + attrIndex} style={this.tableCellStyles}>{this.buildDisplayValue(name, attribute)}</div>)
      }
    }
    row.push(this.buildActions(this.props.item))
  
    return <div style={this.tableRowStyles}>{row}</div>
  }

  buildDisplayValue(name, attribute) {
    var value = undefined;
    if (name.indexOf(".") !== -1) {
      var splitted = name.split('.')
      value = this.props.item[splitted[0]]
      for (var i=1; i<splitted.length; i++) {
        if (value) {
          value = value[splitted[i]]
        } else {
          console.log("Subproperty error for '" + name + "' at '" + splitted[i])
          break
        }
      }
    } else {
      value = this.props.item[name]
    }

   if (attribute instanceof Object) {
     if (attribute.link) {
       var link = attribute.link.replace("[[VALUE]]", value)
       if (link.indexOf("[[MOODLE_URL]]") !== -1) {
         link = link.replace("[[MOODLE_URL]]", configs.moodle.url)
       }
       value = <a href={link} target="_blank">{value}</a>
     }
     if (attribute.type === "image") {
       value = <img src={value} style={{width: 100}} />
     }
   }

   return value
  }

  buildActions() {
    var actions = []
    if (!this.props.actions) {
      actions.push(<a key="action-delete" href="#" onClick={this.handleDelete} className="admin-action-button pe pe-7s-junk"></a>)
      actions.push(<a key="action-see" href="#" onClick={this.handleSee} className="admin-action-button pe pe-7s-look"></a>)
      actions.push(<a key="action-edit" href="#" onClick={this.handleEdit} className="admin-action-button pe pe-7s-pen"></a>)
    } else {
      this.props.actions.map(action => {
        if (action instanceof Object) {
          actions.push(<a key={"action-" + action} onClick={this.handleCustomAction.bind(this, action)} className={"admin-action-button" + (action.icon ? (" pe pe-7s-" + action.icon) : "")}>{action.icon ? "" : action.label}</a>)
        } else {
          switch(action) {
            case "delete":
              actions.push(<a key="action-delete" href="#" onClick={this.handleDelete} className="admin-action-button pe pe-7s-junk"></a>)
              break;
            case "see":
              actions.push(<a key="action-see" href="#" onClick={this.handleSee} className="admin-action-button pe pe-7s-look"></a>)
              break;
            case "edit":
              actions.push(<a key="action-delete" href="#" onClick={this.handleDelete} className="admin-action-button pe pe-7s-junk"></a>)
              actions.push(<a key="action-see" href="#" onClick={this.handleSee} className="admin-action-button pe pe-7s-look"></a>)
              actions.push(<a key="action-edit" href="#" onClick={this.handleEdit} className="admin-action-button pe pe-7s-pen"></a>)
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
