import React from "react"
import { connect } from 'react-redux'

import ArchiveForm from './archive/form'

class Archive extends React.Component {

  render() {
    return (
      <div>
        <div className="clue-levels-form">
          <ArchiveForm scenario={this.props.entity} />
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(Archive)
