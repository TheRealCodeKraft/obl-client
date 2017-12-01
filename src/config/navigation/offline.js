import Header from '../../components/offline/header'
import Link from '../../components/common/header/link'
import MainWrapper from '../../components/common/main-wrapper'
import Home from '../../components/offline/home'
import Login from '../../components/offline/login'
import Signup from '../../components/offline/signup'
import SpeedBattle from '../../components/offline/speed-battle'

const offline = {
  root: "/",
  header: Header,
  mainSectionClass: "content content-no-sidebar",
  wrapper: {
    component: MainWrapper,
    config: {
      mainSectionClass: "content content-no-sidebar"
    }
  },
  menu: {
    navigation: {
      navLink: Link,
      items: [
        {
          title: "Accueil",
          root: true,
          component: Home,
          discardOnLogin: true,
        },
        {
          title: "Connexion",
          route: "login",
          discardOnLogin: true,
          component: Login
        },
        {
          title: "Inscription",
          route: "signup",
          discardOnLogin: true,
          component: Signup
        },
        {
          title: "Speed Battle",
          route: "speed-battle",
          display: false,
          component: SpeedBattle
        }
      ]
    }
  }
}

export default offline
