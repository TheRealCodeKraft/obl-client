import Header from '../../components/common/header'
import MainWrapper from '../../components/common/main-wrapper'

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
  wrapper: {
    component: MainWrapper
  },
  menu: {
    general: {
      label: "Général",
      hiddenOnHome: true,
      items: [
        {
          title: "Tableau de bord admin",
          root: true
        },
        {
          title: "Retour au site",
          switch: "/dashboard"
        },
        {
          title: "Se déconnecter",
          type: "logout"
        }
      ]
    },
    users: {
      label: "Utilisateurs",
      items: [
        _users,
        _areas,
        _schools,
        _specialities
      ]
    },
    games: {
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
      label: "Sessions",
      items: [
        _sessions,
        _rooms
      ]
    }
  }
}

export default config
