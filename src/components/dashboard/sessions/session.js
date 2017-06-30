import React from "react"

class Session extends React.Component {

  constructor(props) {
    super(props)
    
    this.goToSession = this.goToSession.bind(this)
  }

  render() {
    return (

      <div className="row">

                    <div className="col-xs-12">

                        <div className={"panel panel-filled panel-list-jeux panel-c-success"}>
                            
                            <div className="row">
                                <div className="col-md-2">
                                    <div className="panel-body">
                                       <img src="assets/images/vignette-jeu.jpg" className="img-rounded" alt="vignette-jeu" />
                                    </div>
                                </div>
                                <div className="col-md-10">
                                    <div className="panel-heading">
                                        <h4>{this.props.session.title}</h4>
                                        <div className="small">Session nom école - JJ/MM/AAAA</div>
                                    </div>
                                    <div className="panel-body">
                                        <div><mark className="mark-green">Session en cours</mark></div>
                                    </div>
                                    <div className="panel-footer">
                                        <a className={"btn btn-success"} href="#" onClick={this.goToSession}>Accéder à la salle de jeu</a>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
      </div>

    )
  }

  goToSession(e) {
    e.prevenDefault()
  }

}

export default Session
