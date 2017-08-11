import BaseClient from './base'

import store from 'reducers/index';

var ClueClient = function() {
  var name = "clue", plural = "clues";

  var fetchAll = function(params, callback) {
    BaseClient.get("clues", params, function(data) {
      store.dispatch({
        type: "CLUES",
        clues: data
      })
      if (callback) callback(data)
    })
  }

  var fetchOne = function(id, callback) {
    BaseClient.get("clues/" + id, {}, function(data) {
      store.dispatch({
        type: "CLUE",
        clue: data
      })
      if (callback) callback(data)
    })
  }

  var create = function(params, callback) {
    BaseClient.post(plural, params, function(data) {
      if (!data.error) {
        store.dispatch({
          type: "NEW_CLUE",
          clue: data
        })
      }
      if (callback) callback(data)
    })
  }

  var update = function(id, params, callback) {
    BaseClient.put(plural, id, params, function(data) {
      store.dispatch({
        type: "UPDATE_CLUE",
        clue: data
      })
      if (callback) callback(data)
    })
  }

  var destroy = function(id, callback) {
    BaseClient.destroy(plural, id, function(data) {
      store.dispatch({
        type: "DESTROY_CLUE",
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

export default ClueClient
