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
             <Mobility key="profile-mobility" entity={me} value={this.getItemList(me.areas)} />,
             <School key="profile-school" entity={me} value={me.school} />,
             <Specialities key="profile-specialities" entity={me} value={this.getItemList(me.specialities)} />,
             <Personality key="profile-personality" entity={me} />]
          : null}
      </div>
    )
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
