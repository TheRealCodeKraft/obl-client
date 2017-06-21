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
    var me = this.props.me

    return (
      <div id="profile">
        {me !== null 
          ? [<Fullname entity={me} value={me.firstname + " " + me.lastname} />,
             <Email entity={me} value={me.email} />,
             <Pseudo entity={me} value={me.pseudo} />,
             <Password entity={me} value="Modifiez votre mot de passe" />,
             <Traineeship entity={me} value={this.props.traineeship ? "Oui" : "Non"} />,
             <Contract entity={me} value={me.contract ? "Oui" : "Non"} />,
             <Mobility entity={me} value={me.mobility} />,
             <School entity={me} value={me.school} />,
             <Specialities entity={me} value={me.specialities} />,
             <Personality entity={me} />]
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
