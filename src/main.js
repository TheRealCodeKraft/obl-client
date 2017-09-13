/*
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

import Logger from 'js-logger';
Logger.useDefaults();

import { Provider } from 'react-redux';
import store from './reducers/index'

require('dotenv').config()
 
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app-root')
  );
});
*/

import { Bootstrap } from 'codekraft-react-frontend'

import SessionClient from 'clients/session'
import ClueClient from 'clients/clue'
import GameClient from 'clients/game'
import ScenarioClient from 'clients/scenario'

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
    offline: {
      
    },
    dashboard: DashboardNav,
    admin: AdminNav
  }
}

Bootstrap.launch(config)
