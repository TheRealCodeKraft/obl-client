import React from "react"
import { connect } from 'react-redux';

import AdminPageList from './admin-page/list'
import AdminSidebar from './admin-page/sidebar'

import Form from 'components/utils/form'

export default function(config) {
  class AdminPage extends React.Component {

    constructor(props) {
      super(props)

      this.state = {
        mode: "list"
      }

      this.handleCloseSidebar = this.handleCloseSidebar.bind(this)
      this.handleDelete = this.handleDelete.bind(this)
      this.handleSee = this.handleSee.bind(this)
      this.handleEdit = this.handleEdit.bind(this)

      this.handleSubmitComplete = this.handleSubmitComplete.bind(this)
    }

    componentWillMount() {
      if (config.client) {
        if (config.client["fetchAll"]) {
          config.client["fetchAll"]()
        }
      }
    }

    render() {
      const pluralName = getPluralName()
      var attrIndex = undefined

      return (
        <div>
          <h2>{config.title}</h2>

          <AdminPageList attributes={config.list.attributes} 
                         items={this.props[pluralName]}
                         onDelete={this.handleDelete}
                         onSee={this.handleSee}
                         onEdit={this.handleEdit}
          />

          <AdminSidebar onClose={this.handleCloseSidebar} ref="sidebar">
            {this.getSidebarContent()}
          </AdminSidebar>

        </div>
      )
    }

    getSidebarContent() {
      var content = null
      switch(this.state.mode) {
        case "edit":
        case "see":
          var values = null
          if (this.state.currentId !== undefined) {
            values = this.props[getPluralName()].filter(item => { return item.id === this.state.currentId })[0]
          }
          content = <Form id={config.client.name + "-form"}
                          fields={config.form.attributes} 
                          values={values}
                          submitLabel={config.form.submitLabel ? config.form.submitLabel : "Enregistrer"} 
                          service={{client: config.client, func: "login"}}
                          onSubmitComplete={this.handleSubmitComplete}
                    />
          break
        case "delete":
          break
      }
      return content
    }

    openSidebar() {
      this.refs.sidebar.open()
    }

    handleDelete(id) {
      this.setState({currentId: id, mode: "delete"})
    }

    handleSee(id) {
      this.setState({currentId: id, mode: "see"})
    }

    handleEdit(id) {
      this.setState({currentId: id, mode: "edit"}, this.openSidebar)
    }

    handleSubmitComplete(data) {
      console.dir(data)
    }

    handleCloseSidebar() {
      this.setState({currentId: undefined, mode: "list"})
    }

  }

  function getPluralName() {
    return (config.client.plural ? config.client.plural : (config.client.name + "s"))
  }

  function mapStateToProps(state) {
    var pluralName = getPluralName()

    var props = {}
    props[pluralName] = state[config.client.name + "State"][pluralName] || []
    return props
  }

  return connect(mapStateToProps)(AdminPage)
}
