import React from "react";

import { Link } from 'react-router-dom'

class Header extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div className="back-link">
        <Link to="/"><img src="assets/images/logo-obl-small.png" alt="Open Business Labs" /></Link>
      </div>
    )
  }
}

export default Header
