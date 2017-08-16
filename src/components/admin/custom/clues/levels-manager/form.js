import React from "react"

import ClueClient from 'clients/clue'

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
        {/*<input type="number" value={this.state.level} onChange={this.handleLevelChange} />*/}
        <input type="text" value={this.state.description} onChange={this.handleDescriptionChange} />
        <Button onClick={this.handleSave}>Enregistrer</Button>
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
    ClueClient.createLevel(this.props.clue.id, this.state.description, this.state.level, function(response) {
      if (!response.error) {
        self.setState({description: ""})
      } 
    })
  }

}

export default LevelForm
