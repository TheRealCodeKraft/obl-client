import React from "react"

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
    return (
      <div id="profile">
        <Fullname />
        <Email />
        <Pseudo />
        <Password />
        <Traineeship />
        <Contract />
        <Mobility />
        <School />
        <Specialities />
        <Personality />
      </div>
    )
  }

}

export default Profile
