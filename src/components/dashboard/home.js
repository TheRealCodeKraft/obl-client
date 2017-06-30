import React from "react"

import { Link } from "react-router-dom"

//import UserClient from 'clients/user' Test Hugo 30062017

class Home extends React.Component {

  render() {

    return (
      	<section className={"content"}>
            <div className={"container-fluid"}>


                <div className={"row"}>
                    <div className={"col-xs-12"}>

                        <h1><i className={"pe pe-7s-home text-warning"}></i> Accueil</h1>

                        <h2><small>Bienvenue sur ton compte Open Business Labs <span className={"c-white"}>this.props.entity.firstname</span> !</small></h2>

                    </div>
                </div>

                <div className={"row"}>
                    <div className={"col-md-6"}>

                        <Link to="/dashboard/profile" className={"panel-home-student"}>
                            <div className={"panel panel-filled"}>
                                <div className={"panel-body"}>
                                    <h2>
                                        <i className={"pe pe-7s-user pe-3x pe-va text-warning"}></i> Profil
                                    </h2>
                                    <div>Compléter ton profil et tes infos personnelles.</div>
                                </div>
                            </div>
                        </Link>


                    </div>
                    <div className={"col-md-6"}>

                        <Link to="/dashboard/sessions" className={"panel-home-student"}>
                            <div className={"panel panel-filled"}>
                                <div className={"panel-body"}>
                                    <h2>
                                        <i className={"pe pe-7s-joy pe-3x pe-va text-warning"}></i> Jeux
                                    </h2>
                                    <div>Consulter les jeux auxquels tu es inscrit et les résultats de ceux auxquels tu as participé.</div>
                                </div>
                            </div>
                        </Link>

                    </div>
                </div>

            </div>
    	</section>
    )
  }

}

export default Home
