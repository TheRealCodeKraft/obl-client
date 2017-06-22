import React from "react"
import { connect } from 'react-redux'

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
          ? [<Fullname key="profile-fullname" entity={me} value={me.firstname + " " + me.lastname} />,
             <Email key="profile-email" entity={me} value={me.email} />,
             <Pseudo key="profile-pseudo" entity={me} value={me.pseudo} />,
             <Password key="profile-password" entity={me} value="Modifiez votre mot de passe" />,
             <Traineeship key="profile-traineeship" entity={me} value={me.traineeship ? "Oui" : "Non"} />,
             <Contract key="profile-contract" entity={me} value={me.contract ? "Oui" : "Non"} />,
             <Mobility key="profile-mobility" entity={me} value={this.getAreas()} />,
             <School key="profile-school" entity={me} value={me.school} />,
             <Specialities key="profile-specialities" entity={me} value={me.specialities} />,
             <Personality key="profile-personality" entity={me} />]
          : null}
      </div>
    )
  }

  getAreas() {
    var areas = ""
    var items = this.props.me.areas.sort(function(a, b) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0) })
    for (var index in items) {
      areas += items[index].name
      if (index < (items.length - 1)) areas += ", "
    }
    return areas
  }

}

function mapStateToProps(state) {
  return {
    me: state.userState.me || null
  }
}

export default connect(mapStateToProps)(Profile)
