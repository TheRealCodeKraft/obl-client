import BaseClient from './base'

import store from 'reducers/index';

var ScenarioClient = function() {
  var name = "scenario", plural = "scenarios";

  var fetchAll = function(params, callback) {
    BaseClient.get("scenarios", params, function(data) {
      store.dispatch({
        type: "SCENARIOS",
        scenarios: data
      })
      if (callback) callback(data)
    })
  }

  var fetchOne = function(id, callback) {
    BaseClient.get("scenarios/" + id, {}, function(data) {
      store.dispatch({
        type: "SCENARIO",
        scenario: data
      })
      if (callback) callback(data)
    })
  }

  var create = function(params, callback) {
    BaseClient.post(plural, params, function(data) {
      if (!data.error) {
        store.dispatch({
          type: "NEW_SCENARIO",
          scenario: data
        })
      }
      if (callback) callback(data)
    })
  }

  var update = function(id, params, callback) {
    BaseClient.put(plural, id, params, function(data) {
      store.dispatch({
        type: "UPDATE_SCENARIO",
        scenario: data
      })
      if (callback) callback(data)
    })
  }

  var destroy = function(id, callback) {
    BaseClient.destroy(plural, id, function(data) {
      store.dispatch({
        type: "DESTROY_SCENARIO",
        id: data.id
      })
      if (callback) callback(data)
    })
  }


  var upload = function(id, fieldName, file, callback) {
    BaseClient.put(plural + '/vts-archive-coming', id, {}, function(data) {
      store.dispatch({
        type: "UPDATE_SCENARIO",
        scenario: data
      })

      BaseClient.upload(plural + '/' + id + '/' + fieldName, fieldName, file, function(data) {
        store.dispatch({
          type: "UPLOAD_FILE",
          game: data
        })
        if (callback) callback(data)
      })
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

    upload: upload,
  }

}()

export default ScenarioClient
