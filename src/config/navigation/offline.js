import Header from '../../components/offline/header'
import MainWrapper from '../../components/common/main-wrapper'
import Home from '../../components/offline/home'
import Login from '../../components/offline/login'
import Signup from '../../components/offline/signup'

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
        }
      ]
    }
  }
}

export default offline
