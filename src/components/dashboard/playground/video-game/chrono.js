import React from "react"
var moment = require("moment")

class Chrono extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    this.setState({remaining: this.props.initial * 60 * 1000, currentTs: moment(), startTs: moment()}, function() {
      this.tick()
    })
  }

  render() {
    return (
      <div className="chrono">
        <span className="inner">
          <i className="pe-7s-stopwatch"></i>{this.state.remaining ? moment(this.state.remaining).format("mm:ss") : null}
        </span>
      </div>
    )
  }

  tick() {
    var self = this
    setTimeout(function() {
      var now = moment()
      var total = moment(self.props.initial * 60 * 1000)
      var remaining = moment(total - (now - self.state.startTs))
      if (remaining < 0) {
        self.setState({finished: true, remaining: moment(0)}, function() {
          if (self.props.onEnd) self.props.onEnd()
        })
      } else {
        self.setState({currentTs: now, remaining: remaining}, function() {
          self.tick()
        })
      }
    }, 500);
  }

/*
  startChrono() {
    var minutes = this.currentUserState().scenario.chrono
    var self = this
    setTimeout(function() {
    }, minutes * 60 * 1000);
    this.tick()
  }
*/
}

export default Chrono
