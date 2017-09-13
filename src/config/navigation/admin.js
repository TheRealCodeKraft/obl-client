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
  menu: {
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
