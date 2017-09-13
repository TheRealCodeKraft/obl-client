import Header from '../../components/offline/header'
import Home from '../../components/offline/home'
import { Login, Signup } from 'codekraft-react-frontend'

const offline = {
  root: "/",
  header: Header,
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
          //component: Login
        },
        {
          title: "Inscription",
          route: "signup",
          discardOnLogin: true,
          //component: Signup
        }
      ]
    }
  }
}

export default offline
