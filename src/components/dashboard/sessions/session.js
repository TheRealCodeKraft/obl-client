import React from "react"
import {Link} from "react-router-dom"

var moment = require("moment")

class Session extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    var sessionStatus = {
      color: this.props.session.playable == "waiting" ? "orange" : (this.props.session.playable == "open" ? "green" : "red"),
      label: "Session " + (this.props.session.playable == "waiting" ? "à venir" : (this.props.session.playable == "open" ? "en cours" : "terminée"))
    }
    return (
      <div className="row">
        <div className="col-xs-12">
          <div className={"panel panel-filled panel-list-jeux panel-c-success"}>
            <div className="row">
              <div className="col-md-2">
                <div className="panel-body">
                  <img src={this.props.session.game.picture} className="img-rounded" alt="vignette-jeu" />
                </div>
              </div>
              <div className="col-md-10">
                <div className="panel-heading">
                  <h4>{this.props.session.game.title}</h4>
                  <div className="small">{this.props.session.title} - {moment(this.props.session.start_ts).format("DD/MM/YYYY")}</div>
                </div>
                <div className="panel-body">
                  <div><mark className={"mark-" + sessionStatus.color}>{sessionStatus.label}</mark></div>
                </div>
                {this.props.session.playable == "open"
                 ? <div className="panel-footer">
                     <Link className={"btn btn-success"} to={"/dashboard/sessions/" + this.props.session.id}>Accéder à la salle de jeu</Link>
                   </div>
                 : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Session
