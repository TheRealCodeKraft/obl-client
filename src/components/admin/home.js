import React from "react"

import { Link } from "react-router-dom"

import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';

class Home extends React.Component {

  render() {
    return (

            <Grid fluid>

                <Row>
                    <Col xs={12}>

                        <h1><i className={"pe pe-7s-tools text-warning"}></i> Administration</h1>

                    </Col>
                </Row>

                <Row>
                    <Col md={6}>

                        <Link to="/admin/sessions" className={"panel-home-student"}>
                            <Panel className={"panel-filled"}>
                                    <h2>
                                        <i className={"pe-7s-date pe-3x pe-va text-warning"}></i> Sessions
                                    </h2>
                                    <div>Compléter ton profil et tes infos personnelles.</div>
                            </Panel>
                        </Link>

                    </Col>
                    <Col md={6}>

                        <Link to="/admin/games" className={"panel-home-student"}>
                            <Panel className={"panel-filled"}>
                                    <h2>
                                        <i className={"pe pe-7s-joy pe-3x pe-va text-warning"}></i> Jeux
                                    </h2>
                                    <div>Consulter les jeux auxquels tu es inscrit et les résultats de ceux auxquels tu as participé.</div>
                            </Panel>
                        </Link>

                    </Col>
                </Row>

            </Grid>

    )
  }

}

export default Home
