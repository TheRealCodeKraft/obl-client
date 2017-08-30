import BaseClient from './base'

import store from 'reducers/index';

var SchoolClient = function() {
  var name = "school", plural = "schools";

  var fetchAll = function(params, callback) {
    BaseClient.get(name + "s", params, function(data) {
      store.dispatch({
        type: "SCHOOLS",
        schools: data
      })
      if (callback) callback(data)
    })
  }

  var create = function(params, callback) {
    BaseClient.post(plural, params, function(data) {
      if (!data.error) {
        store.dispatch({
          type: "NEW_SCHOOL",
          school: data
        })
      }
      if (callback) callback(data)
    })
  }

  var update = function(id, params, callback) {
    BaseClient.put(plural, id, params, function(data) {
      store.dispatch({
        type: "UPDATE_SCHOOL",
        school: data
      })
      if (callback) callback(data)
    })
  }

  var destroy = function(id, callback) {
    BaseClient.destroy(plural, id, function(data) {
      store.dispatch({
        type: "DESTROY_SCHOOL",
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

export default SchoolClient
