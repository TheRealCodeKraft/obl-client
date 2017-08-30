import BaseClient from './base'

import store from 'reducers/index';

var SpecialityClient = function() {
  var name = "speciality", plural = "specialities";

  var fetchAll = function(params, callback) {
    BaseClient.get(plural, params, function(data) {
      store.dispatch({
        type: "SPECIALITIES",
        specialities: data
      })
      if (callback) callback(data)
    })
  }

  var create = function(params, callback) {
    BaseClient.post(plural, params, function(data) {
      if (!data.error) {
        store.dispatch({
          type: "NEW_SPECIALITY",
          speciality: data
        })
      }
      if (callback) callback(data)
    })
  }

  var update = function(id, params, callback) {
    BaseClient.put(plural, id, params, function(data) {
      store.dispatch({
        type: "UPDATE_SPECIALITY",
        speciality: data
      })
      if (callback) callback(data)
    })
  }

  var destroy = function(id, callback) {
    BaseClient.destroy(plural, id, function(data) {
      store.dispatch({
        type: "DESTROY_SPECIALITY",
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

export default SpecialityClient
