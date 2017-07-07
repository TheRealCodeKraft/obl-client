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
                 sidebarClassName={"admin-sidebar-container" + (this.props.tinify ? " tiny-sidebar" : "")}
                 overlayClassName="admin-sidebar-overlay"
                 pullRight={true}>
        </Sidebar>
      )
    }

    getSidebarContent() {
      return (
        <div>
          <div style={{display: "flex", justifyContent: "space-between", padding: 10}}>
            <span>[sidebar title]</span>
            <a href="#" onClick={this.handleClose}><i className="fa fa-times text-warning"></i></a>
          </div>
          {this.props.children}
        </div>
      )
    }

    open() {
      this.setState({sidebarOpen: true})
    }

    close() {
      this.setState({sidebarOpen: false}, function() {
        if (this.props.onClose) this.props.onClose()
      })
    }

    handleSetSidebarOpen(open) {
      var self = this;
      if (!open) this.close()
      else this.open()
    }

    handleClose(e) {
      e.preventDefault()
      this.close()
    }

  }

  export default AdminSidebar
