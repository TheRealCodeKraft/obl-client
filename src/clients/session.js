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
      if (!data.error) {
        store.dispatch({
          type: "NEW_SESSION",
          session: data
        })
      }
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

  var room = function(id, callback) {
    BaseClient.put(plural + "/room", id, {}, function(data) {
      store.dispatch({
        type: "SESSION_PUSH",
        session: data
      })
      if (callback) callback(data)
    })
  }

  var scenario = function(id, callback) {
    BaseClient.put(plural + "/scenario", id, {}, function(data) {
      store.dispatch({
        type: "SESSION_PUSH",
        session: data
      })
      if (callback) callback(data)
    })
  }

  var clues = function(id, callback) {
    BaseClient.put(plural + "/clues", id, {}, function(data) {
      store.dispatch({
        type: "SESSION_PUSH",
        session: data
      })
      if (callback) callback(data)
    })
  }

  var checkCode = function(session_id, code, callback) {
    BaseClient.put(plural + "/code", session_id + "/" + code, {}, function(data) {
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
    plural: plural,

    fetchAll: fetchAll,
    fetchOne: fetchOne,
    create: create,
    update: update,
    destroy: destroy,

    launch: launch,
    pause: pause,
    room: room,
    scenario: scenario,
    clues: clues,

    checkCode: checkCode,

    pushInState: pushInState
  }

}()

export default SessionClient
