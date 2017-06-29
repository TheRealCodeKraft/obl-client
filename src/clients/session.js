import BaseClient from './base'

import store from 'reducers/index';

var SessionClient = function() {
  var name = "session";

  var fetchAll = function(params, callback) {
    BaseClient.get("sessions", params, function(data) {
      store.dispatch({
        type: "SESSIONS",
        sessions: data
      })
      if (callback) callback(data)
    })
  }

  return {
    name: name,

    fetchAll: fetchAll,
  }

}()

export default SessionClient
