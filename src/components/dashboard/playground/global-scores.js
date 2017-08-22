import React from "react"

import { connect } from 'react-redux'

class GlobalScores extends React.Component {

  render() {
    return (
      <div className="global-scores">
        GLOBAL SCORES
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    me: state.userState.me || null,
  }
}

export default connect(mapStateToProps)(GlobalScores)
