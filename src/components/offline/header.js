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
      marginTop: 15,
      marginLeft: 15
    }

    const imgStyle = {
      height: 40,
      margin: 30
    }

    return (
      <div className="back-link">
        {this.props.location.pathname === "/speed-battle"
         ? <img src="assets/images/FCD_logo.png" style={divStyle} alt="FCD défi des métier de bouches" />
         : <Link to="/"><img src="assets/images/Logo-final.ai.png" alt="Open Business Labs" style={imgStyle}/></Link>
        }
      </div>
    )
  }
}

export default withRouter(Header)
