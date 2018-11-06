import React from "react"
var moment = require("moment")
import { Alert } from 'react-bootstrap';

class Chrono extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      show_timer_alert:false,
      alertTime_isPassed:false
    }

    this.handleHideAlert = this.handleHideAlert.bind(this)
    // console.log("------------------------------------------------------------------------------------------")
    // console.log("Je suis dans le composant Chrono à l'initialisation de la classe")
  }

  componentDidMount() {
    // la props initial est définie dans le component parent "fight.js": initial={this.currentUserState().scenario.chrono}
    // correspond au chrono rensigné par l'admin lors de la création du scenario
    this.setState({remaining: this.props.initial * 60 * 1000, currentTs: moment(), startTs: moment()}, function() {
      // * 60 * 1000 converti les minutes en milliseconds
      // console.log("------------------------------------------------------------------------------------------")
      // console.log("Je suis dans le composant Chrono à l'initialisation du chrono dans le componentWillUnmount")
      // console.log("la valeur du chrono est:" + `${this.props.initial}`)
      // console.log("currentTs:" + `${this.setstate.currentTs}`)
      // console.log("startTs:" + `${this.setstate.startTs}`)
      // console.log("------------------------------------------------------------------------------------------")
      this.tick()
    })
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        {
          this.state.alertTime_isPassed && this.state.show_timer_alert
          ? <div className="chrono-alert">
              <Alert bsStyle="warning" onDismiss={this.handleHideAlert}>
                <h4><i className="pe-7s-attention"></i> Attention plus que 5 minutes !!</h4>
              </Alert>
            </div>
          : null
        }
        <div className="chrono">
          <span className="inner">
            <i className="pe-7s-stopwatch"></i>{this.state.remaining ? moment(this.state.remaining).format("mm:ss") : null}
          </span>
        </div>
      </div>
    )
  }

  tick() {
    var self = this
    setTimeout(function() {
      // heure de départ du chrono
      var now = moment()
      //
      var total = moment(self.props.initial * 60 * 1000)
      var alertTime = moment(total - 20000)
      var remaining = moment(total - (now - self.state.startTs))
      // console.log("je log now, total, alertime et remaining")
      // console.log(now)
      // console.log(alertTime)
      // console.log(remaining)
      if (remaining < 0) {
        self.setState({finished: true, remaining: moment(0)}, function() {
          if (self.props.onEnd) self.props.onEnd()
        })
      }
      else {
        self.setState({currentTs: now, remaining: remaining}, function() {
          self.tick()
          if (remaining <= alertTime) {
            this.setState({alertTime_isPassed:true})
            setTimeout(function() {
              this.setState({show_timer_alert:false})
            }.bind(this), 8000);
          }
        })
      }
    }, 500);
  }

  handleHideAlert() {
    this.setState({show_timer_alert:false})
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
