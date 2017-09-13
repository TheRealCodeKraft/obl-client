import BaseItem from "../base-item"
import { connect } from 'react-redux'

class Personality extends BaseItem {

  constructor(props) {
    super(props)

    this.label = "Personnalité"
  }

}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients
  }
}

export default connect(mapStateToProps)(Personality)
