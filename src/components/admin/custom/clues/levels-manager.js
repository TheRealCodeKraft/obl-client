import React from "react"
import { connect } from 'react-redux';

import QrCodes from './levels-manager/qr-codes'
import Levels from './levels-manager/levels'
import LevelForm from './levels-manager/form'

class LevelsManager extends React.Component {

  render() {
    return (
      <div>
        <div className="clue-qr-codes">
          <QrCodes clue={this.props.entity} />
        </div>
        <div className="clue-levels-list">
          <Levels clue={this.props.entity} />
        </div>
        <div className="clue-levels-form">
          <LevelForm clue={this.props.entity} />
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(LevelsManager)
