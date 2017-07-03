import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

import Logger from 'js-logger';
Logger.useDefaults();

import { Provider } from 'react-redux';
import store from './reducers/index'

require('dotenv').config()
console.log(process.env)
 
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app-root')
  );
});
