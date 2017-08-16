import BaseClient from './base'

import store from 'reducers/index';

var RoomClient = function() {
  var name = "room", plural = "rooms";

  var fetchAll = function(params, callback) {
    BaseClient.get("rooms", params, function(data) {
      store.dispatch({
        type: "ROOMS",
        rooms: data
      })
      if (callback) callback(data)
    })
  }

  var fetchOne = function(id, callback) {
    BaseClient.get("rooms/" + id, {}, function(data) {
      store.dispatch({
        type: "ROOM",
        room: data
      })
      if (callback) callback(data)
    })
  }

  var create = function(params, callback) {
    BaseClient.post(plural, params, function(data) {
      if (!data.error) {
        store.dispatch({
          type: "NEW_ROOM",
          room: data
        })
      }
      if (callback) callback(data)
    })
  }

  var update = function(id, params, callback) {
    BaseClient.put(plural, id, params, function(data) {
      store.dispatch({
        type: "UPDATE_ROOM",
        room: data
      })
      if (callback) callback(data)
    })
  }

  var destroy = function(id, callback) {
    BaseClient.destroy(plural, id, function(data) {
      store.dispatch({
        type: "DESTROY_ROOM",
        id: data.id
      })
      if (callback) callback(data)
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
  }

}()

export default RoomClient
