import React from "react"

import AdminPageListHeader from './list/header'
import AdminPageListRow from './list/row'

class AdminPageList extends React.Component {

  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSee = this.handleSee.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  render() {
    return (
      <div style={{display: "flex", flexDirection: "column"}}>
        <AdminPageListHeader attributes={this.props.attributes} />
        {this.props.items.map((item, index) => {
          return <AdminPageListRow item={item} 
                                   attributes={this.props.attributes} 
                                   onDelete={this.handleDelete}
                                   onSee={this.handleSee}
                                   onEdit={this.handleEdit}
                 />
        })}
      </div>
    )
  }

  handleDelete(id) {
    if (this.props.onDelete) this.props.onDelete(id)
  }

  handleSee(id) {
    if (this.props.onSee) this.props.onSee(id)
  }

  handleEdit(id) {
    if (this.props.onEdit) this.props.onEdit(id)
  }

}

export default AdminPageList
