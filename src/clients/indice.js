import BaseClient from './base'

import store from 'reducers/index';

var IndiceClient = function() {
  var name = "indice", plural = "indices";

  var fetchAll = function(params, callback) {
    BaseClient.get("indices", params, function(data) {
      store.dispatch({
        type: "INDICES",
        indices: data
      })
      if (callback) callback(data)
    })
  }

  var fetchOne = function(id, callback) {
    BaseClient.get("indices/" + id, {}, function(data) {
      store.dispatch({
        type: "INDICE",
        indice: data
      })
      if (callback) callback(data)
    })
  }

  var create = function(params, callback) {
    BaseClient.post(plural, params, function(data) {
      if (!data.error) {
        store.dispatch({
          type: "NEW_INDICE",
          indice: data
        })
      }
      if (callback) callback(data)
    })
  }

  var update = function(id, params, callback) {
    BaseClient.put(plural, id, params, function(data) {
      store.dispatch({
        type: "UPDATE_INDICE",
        indice: data
      })
      if (callback) callback(data)
    })
  }

  var destroy = function(id, callback) {
    BaseClient.destroy(plural, id, function(data) {
      store.dispatch({
        type: "DESTROY_INDICE",
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

export default IndiceClient
