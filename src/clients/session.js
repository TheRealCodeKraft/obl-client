import BaseClient from './base'

import store from 'reducers/index';

var SessionClient = function() {
  var sessions = function(params, callback) {
    BaseClient.get("sessions", params, function(data) {
      store.dispatch({
        type: "SESSIONS",
        sessions: data
      })
      if (callback) callback(data)
    })
  }

  return {
    sessions: sessions,
  }

}()

export default SessionClient
