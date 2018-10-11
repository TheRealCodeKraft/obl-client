import React from "react";

import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    const divStyle = {
      height: 60,
      width: 'auto',
      backgroundColor: 'white',
      marginTop: 15,
      marginLeft: 15,
    }

    return (
      <div className="back-link">
        {this.props.location.pathname === "/speed-battle"
         ? <img src="assets/images/FCD-ombre-blanche.png" style={divStyle} alt="FCD défi des métier de bouches" />
         : <Link to="/"><img src="assets/images/logo-obl-small.png" alt="Open Business Labs" /></Link>
        }
      </div>
    )
  }
}

export default withRouter(Header)
