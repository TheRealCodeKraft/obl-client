import React from "react"
import { connect } from 'react-redux';

import { Button } from 'react-bootstrap';

class LevelForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      level: 1,
      description: ""
    }

    this.handleLevelChange = this.handleLevelChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)

    this.handleSave = this.handleSave.bind(this)
  }

  render() {
    return (
        <div className="clue-level-form">
          <hr/>
          {/*<input type="number" value={this.state.level} onChange={this.handleLevelChange} />*/}
          <label>Entrez ci-dessous un indice</label>
          <textarea className="form-control" type="text" value={this.state.description} onChange={this.handleDescriptionChange}></textarea>
          <Button onClick={this.handleSave}>Enregistrer l'indice</Button>
        </div>
    )
  }

  handleLevelChange(e) {
    this.setState({level: e.target.value})
  }

  handleDescriptionChange(e) {
    this.setState({description: e.target.value})
  }

  handleSave() {
    var self=this
    this.props.clients.ClueClient.createLevel(this.props.clue.id, this.state.description, this.state.level, function(response) {
      if (!response.error) {
        self.setState({description: ""})
      } 
    })
  }

}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients || {}
  }
}

export default connect(mapStateToProps)(LevelForm)
