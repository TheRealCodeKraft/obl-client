import BaseClient from './base'

import store from 'reducers/index';

var AreaClient = function() {
  var name = "area", plural = "areas";

  var fetchAll = function(params, callback) {
    BaseClient.get(name + "s", params, function(data) {
      store.dispatch({
        type: "AREAS",
        areas: data
      })
      if (callback) callback(data)
    })
  }

  var create = function(params, callback) {
    BaseClient.post(plural, params, function(data) {
      if (!data.error) {
        store.dispatch({
          type: "NEW_AREA",
          area: data
        })
      }
      if (callback) callback(data)
    })
  }

  var update = function(id, params, callback) {
    BaseClient.put(plural, id, params, function(data) {
      store.dispatch({
        type: "UPDATE_AREA",
        area: data
      })
      if (callback) callback(data)
    })
  }

  var destroy = function(id, callback) {
    BaseClient.destroy(plural, id, function(data) {
      store.dispatch({
        type: "DESTROY_AREA",
        id: data.id
      })
      if (callback) callback(data)
    })
  }

  return {
    name: name,
    plural: plural,

    fetchAll: fetchAll,
    create: create,
    update: update,
    destroy: destroy,
  }

}()

export default AreaClient
