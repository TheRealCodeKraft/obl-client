import BaseClient from './base'

import store from 'reducers/index';

var SessionClient = function() {
  var name = "session", plural = "sessions";

  var fetchAll = function(params, callback) {
    BaseClient.get("sessions", params, function(data) {
      store.dispatch({
        type: "SESSIONS",
        sessions: data
      })
      if (callback) callback(data)
    })
  }

  var fetchOne = function(id, callback) {
    BaseClient.get("sessions", {id: id}, function(data) {
      store.dispatch({
        type: "SESSION",
        session: data
      })
      if (callback) callback(data)
    })
  }

  var create = function(params, callback) {
    BaseClient.post(plural, params, function(data) {
      store.dispatch({
        type: "NEW_SESSION",
        session: data
      })
      if (callback) callback(data)
    })
  }

  var update = function(id, params, callback) {
    BaseClient.put(plural, id, params, function(data) {
      store.dispatch({
        type: "UPDATE_SESSION",
        session: data
      })
      if (callback) callback(data)
    })
  }

  var destroy = function(id, callback) {
    BaseClient.destroy(plural, id, function(data) {
      store.dispatch({
        type: "DESTROY_SESSION",
        id: data.id
      })
      if (callback) callback(data)
    })
  }

  return {
    name: name,

    fetchAll: fetchAll,
    create: create,
    update: update,
    destroy: destroy
  }

}()

export default SessionClient
