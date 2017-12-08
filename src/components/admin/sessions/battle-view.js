import React from "react"

import { Grid, Row, Col } from 'react-bootstrap';

class BattleView extends React.Component {

  render() {
    return (
      <Grid>
        {this.props.session.rounds.map((round, index) => {
              return (
                <Row>
                  {round.userStates.sort(function(a, b) { return a.player.id > b.player.id }).map((st, sti) => {
                    return [
                      <Col xs={3}>{st.player.lastname} - {st.email ? st.email : "Pas de mail :("}</Col>,
                      <Col xs={3}>{sti === 0 ? "Gagné!" : "Perdu..."}</Col>
                    ]
                  })}
                </Row>
              )
            })}
        <Row>
          <Col xs={12}>
            <hr />
            <h3>Tous les emails : </h3>
            {this.props.session.rounds.map((round, index) => {
              return round.userStates.map(state => {
                return <div>{state.email}</div>
              })
            })}
          </Col>
        </Row>
      </Grid>
    )
  }

}

export default BattleView
