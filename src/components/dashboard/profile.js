import React from "react"
import { connect } from 'react-redux'

var moment = require("moment")
import Fullname from './profile/items/fullname'
import Email from './profile/items/email'
import Pseudo from './profile/items/pseudo'
import Password from './profile/items/password'
import Traineeship from './profile/items/traineeship'
import Contract from './profile/items/contract'
import Mobility from './profile/items/mobility'
import School from './profile/items/school'
import Specialities from './profile/items/specialities'
import Personality from './profile/items/personality'

import {Grid, Row, Col} from "react-bootstrap"

class Profile extends React.Component {

  render() {
    var me = this.props.me

    return (

      <section className="content">
            <Grid fluid>


                <Row>
                    <Col xs={12}>

                        <h1><i className={"pe pe-7s-user text-warning"}></i> Profil</h1>

                    </Col>
                </Row>

                {me !== null 
                  ? [

                      <Fullname key="profile-fullname" entity={me} value={me.firstname + " " + me.lastname} />,
                      <Email key="profile-email" entity={me} value={me.email} />,
                      <Pseudo key="profile-pseudo" entity={me} value={me.pseudo} />,
                      <Password key="profile-password" entity={me} value="Modifiez votre mot de passe" />,
                      <Traineeship key="profile-traineeship" entity={me} value={this.getTraineeshipLabel()} />,
                      <Contract key="profile-contract" entity={me} value={me.contract ? "Oui" : "Non"} />,
                      <Mobility key="profile-mobility" entity={me} value={this.getItemList(me.areas)} />,
                      <School key="profile-school" entity={me} value={me.school ? me.school.name : "Aucune"} />,
                      <Specialities key="profile-specialities" entity={me} value={this.getItemList(me.specialities)} />,
                      <Personality key="profile-personality" entity={me} />

                    ]
                  : null}

            </Grid>
      </section>

    )
  }

  getTraineeshipLabel() {
    if (this.props.me.traineeship) {
      var tsString = null
      if (this.props.me.traineeship_start_ts !== null && this.props.me.traineeship_end_ts !== null) {
        tsString = "Du " + moment(this.props.me.traineeship_start_ts).format("DD/MM/YYYY") + " au " + moment(this.props.me.traineeship_end_ts).format("DD/MM/YYYY")
      } else if (this.props.me.traineeship_start_ts !== null) {
        tsString = "A partir du " + moment(this.props.me.traineeship_start_ts).format("DD/MM/YYYY")
      }
      return "Oui" + (tsString ? " > " + tsString : "") 
    }
    else
      return "Non"
  }

  getItemList(list) {
    var values = ""
    var items = list.sort(function(a, b) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0) })
    for (var index in items) {
      values += items[index].name
      if (index < (items.length - 1)) values += ", "
    }
    return values
  }

}

function mapStateToProps(state) {
  return {
    me: state.userState.me || null
  }
}

export default connect(mapStateToProps)(Profile)
