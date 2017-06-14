import React from "react";

import { Link } from 'react-router-dom'

class Header extends React.Component {

  render() {
    return (
      <header id="header">
        <Link to="/">Open Business Lab</Link>
        <Link to="/login">Connexion</Link>
        <Link to="/signup">Inscription</Link>
      </header>
    );
  }

}

export default Header;
