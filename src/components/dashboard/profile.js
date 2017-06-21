import React from "react"
import { connect } from 'react-redux'

import UserClient from 'clients/user'

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

class Profile extends React.Component {

/*
  componentWillMount() {
    UserClient.me()
  }
*/

  render() {
    return (
      <div id="profile">
        {this.props.me !== null 
          ? [<Fullname value={this.props.me.firstname + " " + this.props.me.lastname} />,
             <Email value={this.props.me.email} />,
             <Pseudo value={this.props.me.pseudo} />,
             <Password value="" />,
             <Traineeship value={this.props.traineeship ? "Oui" : "Non"} />,
             <Contract value={this.props.contract ? "Oui" : "Non"} />,
             <Mobility />,
             <School value={this.props.school} />,
             <Specialities />,
             <Personality />]
          : null}
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    me: state.userState.me || null
  }
}

export default connect(mapStateToProps)(Profile)
