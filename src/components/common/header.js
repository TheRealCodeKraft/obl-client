var React = require("react")
import { connect } from 'react-redux'

import { withRouter } from 'react-router'
import { NavLink, Link, Redirect } from 'react-router-dom'

import { Navbar } from 'react-bootstrap';
import { Header, ShowForAcls } from 'codekraft-react-frontend'

class SkeletonHeader extends Header {

  render() {
    var menu_entries = [], menu
    for (var key in this.props.menu) {
      menu_entries = menu_entries.concat(this.buildItemsFor(key))
    }

    return (
      <header id="header">   
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <div id="mobile-menu">
                <div className="left-nav-toggle">
                  <a href="#" onClick={this.handleHamburgerClick}><i className="stroke-hamburgermenu"></i></a>
                </div>
              </div>
              <a className={"navbar-brand" + (this.props.admin ? " navbar-admin" : "")} href="/dashboard">
                <img src="/assets/images/logo-obl-mini.png" alt="Open Business Labs" /> <span>OBL</span>
              </a>
            </div>
            <div className="navbar-collapse collapse" id="navbar">
              <div className="left-nav-toggle">
                <a href="#" onClick={this.handleHamburgerClick}><i className="stroke-hamburgermenu"></i></a>
              </div>
            </div>
          </div>
        </nav>
        <aside className={"navigation"} style={{height: "auto"}}>
          <nav>
            <ul className={"nav luna-nav"}>
              {menu_entries}
            </ul>
          </nav>
        </aside>
      </header>
    );

  }
}

export default withRouter(SkeletonHeader)
