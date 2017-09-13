import Home from 'components/dashboard/home'
import Profile from 'components/dashboard/profile'
import Sessions from 'components/dashboard/sessions'
import Playground from 'components/dashboard/playground'

const dashboard = {
  items: [
    {
      label: "Navigation",
      items: [
        {
          label: "Accueil",
          component: Home
        },
        {
          label: "Profil",
          path: "profile",
          component: Profile
        },
        {
          label: "Jeux",
          path: "sessions",
          component: Sessions
        },
        {
          label: "",
          path: "sessions/:identifier",
          component: Playground,
          display: false
        }
      ]
    }
  ]
}

export default dashboard
