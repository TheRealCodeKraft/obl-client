import React from "react"

import Sidebar from 'react-sidebar'

  class AdminSidebar extends React.Component {

    constructor(props) {
      super(props)

      this.state = {
        sidebarOpen: false
      }

      this.handleSetSidebarOpen = this.handleSetSidebarOpen.bind(this)
      this.handleClose = this.handleClose.bind(this)
    }

    render() {
      return (
        <Sidebar sidebar={this.getSidebarContent()} 
                 open={this.state.sidebarOpen} 
                 onSetOpen={this.handleSetSidebarOpen}
                 rootClassName="admin-sidebar"
                 sidebarClassName="admin-sidebar-container"
                 overlayClassName="admin-sidebar-overlay"
                 pullRight={true}>
        </Sidebar>
      )
    }

    getSidebarContent() {
      return (
        <div>
          {this.props.children}
          <a href="#" onClick={this.handleClose}>Close</a>
        </div>
      )
    }

    open() {
      this.setState({sidebarOpen: true})
    }

    handleSetSidebarOpen(open) {
      var self = this;
      this.setState({sidebarOpen: open}, function() {
        if (!open && self.props.onClose) {
          setTimeout(self.props.onClose, 500)
        }
      });
    }

    handleClose(e) {
      e.preventDefault()
      this.setState({sidebarOpen: false}, function() {
        if (this.props.onClose) setTimeout(this.props.onClose, 500)
      })
    }

  }

  export default AdminSidebar
