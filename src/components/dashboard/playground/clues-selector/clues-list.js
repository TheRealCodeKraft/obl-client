import React from "react"

import { Grid, Row, Col, Table } from 'react-bootstrap';

class CluesList extends React.Component {

  render() {
    return (
              <Table className="indices">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Décideur</th>
                    <th>Indice</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.clues.map(clue => {
                    return (
                      <tr>
                        <td>{clue.family}</td>
                        <td>Tous</td>
                        <td>{clue.description}</td>
                      </tr>
                    )})
                  }
                </tbody>
              </Table>

    )
  }

}

export default CluesList
