import { Bootstrap } from 'codekraft-react-frontend'

import SessionClient from 'clients/session'
import ClueClient from 'clients/clue'
import GameClient from 'clients/game'
import ScenarioClient from 'clients/scenario'

import OfflineNav from './config/navigation/offline'
import DashboardNav from './config/navigation/dashboard'
import AdminNav from './config/navigation/admin'

const config = {
  clients: [
    {
      name: "session",
      client: SessionClient
    },
    {
      name: "game",
      client: GameClient
    },
    "area",
    {
      name: "speciality",
      plural: "specialities"
    },
    "school",
    "objective",
    {
      name: "scenario",
      client: ScenarioClient
    },
    "decision_maker",
    "room",
    {
      name: "clue",
      client: ClueClient
    }
  ],
  navigation: {
    offline: OfflineNav,
    dashboard: DashboardNav,
    admin: AdminNav
  }
}

Bootstrap.launch(config)
