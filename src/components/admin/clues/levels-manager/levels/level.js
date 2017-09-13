import React from "react"
import { connect } from 'react-redux';

class Level extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      destroying: false
    }
    
    this.goUp = this.goUp.bind(this)
    this.goDown = this.goDown.bind(this)
    this.onConfirmDestroy = this.onConfirmDestroy.bind(this)
    this.onCancelDestroy = this.onCancelDestroy.bind(this)
    this.onDestroy = this.onDestroy.bind(this)
  }

  render() {
    return (
      <div className="clue-levels-level">
        <div className="up-and-down">
          {this.props.index !== 1 ? <a href="#" onClick={this.goUp}><span className="pe-7s-angle-up"></span></a> : <span />}
          <span className="level-level">{this.props.index}</span>
          {this.props.last ? <span /> : <a href="#" onClick={this.goDown}><span className="pe-7s-angle-down"></span></a>}
        </div>
        <span className="level-description" style={{display: "flex", alignItems: "center"}}>{this.props.level.description}</span>
        <div className="level-actions" style={{display: "flex", alignItems: "center"}}>
          {this.state.destroying
           ? [<span>Sûr ?</span>,
              <a className="admin-action-button pe pe-7s-close-circle" href="#" onClick={this.onCancelDestroy}></a>,
              <a className="admin-action-button pe pe-7s-check" href="#" onClick={this.onDestroy}></a>]
           : <a className="admin-action-button pe pe-7s-junk" href="#" alt="Supprimer" title="Supprimer" onClick={this.onConfirmDestroy}></a>}
        </div>
      </div>
    )
  }

  goUp(e) {
    e.preventDefault()
    if (!this.props.sorting && this.props.onUp) this.props.onUp(this.props.level.id)
  }

  goDown(e) {
    e.preventDefault()
    if (!this.props.sorting && this.props.onDown) this.props.onDown(this.props.level.id)
  }

  onConfirmDestroy(e) {
    e.preventDefault()
    this.setState({destroying: true})
  }

  onCancelDestroy(e) {
    e.preventDefault()
    this.setState({destroying: false})
  }

  onDestroy(e) {
    e.preventDefault()
    var self = this
    this.props.clients.ClueClient.destroyLevel(this.props.level.id, function(data) {
      self.setState({destroying: false})
    })
  }

}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients || {}
  }
}

export default connect(mapStateToProps)(Level)
