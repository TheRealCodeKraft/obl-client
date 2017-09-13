import Home from 'components/dashboard/home'
import Profile from 'components/dashboard/profile'
import Sessions from 'components/dashboard/sessions'
import Playground from 'components/dashboard/playground'
import ProfileFiller from 'components/dashboard/profile-filler'

const dashboard = {
  root: "/dashboard",
  restricted: true,
  profileFiller: ProfileFiller,
  menu: {
    navigation: {
      label: "Navigation",
      items: [
        {
          title: "Accueil",
          root: true,
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
          switch: "/admin",
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
