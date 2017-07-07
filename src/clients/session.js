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
    BaseClient.get("sessions/" + id, {}, function(data) {
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

  var launch = function(id, callback) {
    BaseClient.put(plural + '/launch', id, {}, function(data) {
      store.dispatch({
        type: "SESSION_LAUNCH",
        session: data
      })
      if (callback) callback(data)
    })
  }

  var pause = function(id, callback) {
    BaseClient.put(plural + '/pause', id, {}, function(data) {
      store.dispatch({
        type: "SESSION_PAUSE",
        session: data
      })
      if (callback) callback(data)
    })
  }

  var pushInState = function(session) {
    store.dispatch({
      type: "SESSION_PUSH",
      session: session
    })
  }

  return {
    name: name,

    fetchAll: fetchAll,
    fetchOne: fetchOne,
    create: create,
    update: update,
    destroy: destroy,
    launch: launch,
    pause: pause,

    pushInState: pushInState
  }

}()

export default SessionClient
