import Home from 'components/dashboard/home'
import Profile from 'components/dashboard/profile'
import Sessions from 'components/dashboard/sessions'
import Playground from 'components/dashboard/playground'

const dashboard = {
  menu: {
    navigation: {
      label: "Navigation",
      items: [
        {
          title: "Accueil",
          component: Home
        },
        {
          title: "Profil",
          route: "profile",
          component: Profile
        },
        {
          title: "Jeux",
          route: "sessions",
          component: Sessions
        },
        {
          title: "",
          route: "sessions/:identifier",
          component: Playground,
          display: false
        },
        {
          title: "Administration",
          type: "admin",
          grants: ["admin"]
        },
        {
          title: "Se déconnecter",
          type: "logout"
        }
      ]
    }
  }
}

export default dashboard
