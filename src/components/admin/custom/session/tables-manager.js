import React from "react"
import { connect } from 'react-redux';

import Players from './tables-manager/players'
import Tables from './tables-manager/tables'

class TablesManager extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Players session={this.props.entity} />
        <Tables />
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(TablesManager)
