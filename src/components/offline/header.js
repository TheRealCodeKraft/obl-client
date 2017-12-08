import React from "react";

import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div className="back-link">
        {this.props.location.pathname === "/speed-battle"
         ? <img src="assets/images/logo-obl-small.png" alt="Open Business Labs" />
         : <Link to="/"><img src="assets/images/logo-obl-small.png" alt="Open Business Labs" /></Link>
        }
      </div>
    )
  }
}

export default withRouter(Header)
