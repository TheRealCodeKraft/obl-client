import React from "react"

import { Link } from "react-router-dom"

class Home extends React.Component {

  render() {
    return (
      <div id="dashboard-home">
        <Link to="/dashboard/profile">Profil</Link>
        <Link to="/dashboard/games">Jeux</Link>
      </div>
    )
  }

}

export default Home
