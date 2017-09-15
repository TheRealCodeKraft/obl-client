var React = require("react")
import { connect } from 'react-redux'

import { withRouter } from 'react-router'
import { NavLink, Link, Redirect } from 'react-router-dom'

import { Navbar } from 'react-bootstrap';
import { ShowForAcls } from 'codekraft-react-frontend'

class Header extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      menu: false
    }

    this.handleHamburgerClick = this.handleHamburgerClick.bind(this)
  }

  render() {
    var menu_entries = [], menu_entry, menu, item, route
    for (var key in this.props.menu) {
      menu = this.props.menu[key]
      if (menu.label) {
        menu_entries.push(<li className={"nav-category"}>{menu.label}</li>)
      }
      for (var index in menu.items) {  
        item = menu.items[index]
        if (item.display !== false) {
          if (item.type) {
            switch(item.type) {
              case "logout":
                route = "/logout"
                break
            }

          } else if (item.root === true) {
            route = this.props.root 
          } else if (item.switch) {
            route = item.switch
          } else {
            route = this.props.root + (item.route ? (this.props.root !== "/" ? "/" : "") + item.route : "")
          }
          
          menu_entry = <li className={this.props.location.pathname === route ? "active" : ""}>
                          <NavLink exact to={route}>
                            {item.title}
                          </NavLink>
                        </li>

          if (item.grants) {
            menu_entry = <ShowForAcls grants={item.grants}>{menu_entry}</ShowForAcls>
          }
          menu_entries.push(menu_entry)
        }
      }
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
              <a className="navbar-brand navbar-admin" href="/dashboard">
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

  handleHamburgerClick(e) {
    e.preventDefault()
    this.setState({menu: !this.state.menu}, function() {
      if (this.state.menu) {
        document.body.className += " nav-toggle"
      } else {
        document.body.className -= " nav-toggle"
      }
    })
  }
}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients || {}
  }
}

export default withRouter(connect(mapStateToProps)(Header))
