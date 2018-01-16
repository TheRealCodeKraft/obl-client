import Header from '../../components/common/header'
import Link from '../../components/common/header/link'
import MainWrapper from '../../components/common/main-wrapper'
import Home from '../../components/admin/home'

import _games from './admin/games'
import _sessions from './admin/sessions'
import _users from './admin/users'
import _scenarii from './admin/scenarios'
import _rooms from './admin/rooms'
import _clues from './admin/clues'
import _decisionMakers from './admin/decision-makers'
import _areas from './admin/areas'
import _schools from './admin/schools'
import _objectives from './admin/objectives'
import _specialities from './admin/specialities'

const config = {
  root: "/admin",
  restricted: true,
  grants: ["admin"],
  header: Header,
  enableDefault: false,
  wrapper: {
    component: MainWrapper
  },
  /*
  iconSet: "pe pe-7s-",
  icons: {
    delete: "junk",
    edit: "pen",
    view: "look"
  },
  */
  menu: {
    general: {
      navLink: Link,
      label: "Général",
      hiddenOnHome: true,
      items: [
        {
          title: "Tableau de bord admin",
          root: true,
          hiddenOnHome: true,
          component: Home
        },
        {
          title: "Retour au site",
          hiddenOnHome: true,
          switch: "/dashboard"
        },
        {
          title: "Se déconnecter",
          hiddenOnHome: true,
          type: "logout"
        }
      ]
    },
    users: {
      navLink: Link,
      label: "Utilisateurs",
      items: [
        _users,
        _areas,
        _schools,
        _specialities
      ]
    },
    games: {
      navLink: Link,
      label: "Jeux",
      items: [
        _games,
        _objectives,
        _scenarii,
        _clues,
        _decisionMakers
      ]
    },
    sessions: {
      navLink: Link,
      label: "Sessions",
      items: [
        _sessions,
        _rooms
      ]
    }
  }
}

export default config
