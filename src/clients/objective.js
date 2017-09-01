import BaseClient from './base'

import store from 'reducers/index';

var ObjectiveClient = function() {
  var name = "objective", plural = "objectives";

  var fetchAll = function(params, callback) {
    BaseClient.get("objectives", params, function(data) {
      store.dispatch({
        type: "OBJECTIVES",
        objectives: data
      })
      if (callback) callback(data)
    })
  }

  var fetchOne = function(id, callback) {
    BaseClient.get("objectives/" + id, {}, function(data) {
      store.dispatch({
        type: "OBJECTIVE",
        objective: data
      })
      if (callback) callback(data)
    })
  }

  var create = function(params, callback) {
    BaseClient.post(plural, params, function(data) {
      if (!data.error) {
        store.dispatch({
          type: "NEW_OBJECTIVE",
          objective: data
        })
      }
      if (callback) callback(data)
    })
  }

  var update = function(id, params, callback) {
    BaseClient.put(plural, id, params, function(data) {
      store.dispatch({
        type: "UPDATE_OBJECTIVE",
        objective: data
      })
      if (callback) callback(data)
    })
  }

  var destroy = function(id, callback) {
    BaseClient.destroy(plural, id, function(data) {
      store.dispatch({
        type: "DESTROY_OBJECTIVE",
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
    destroy: destroy
  }

}()

export default ObjectiveClient
