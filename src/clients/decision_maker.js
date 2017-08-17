import BaseClient from './base'

import store from 'reducers/index';

var DecisionMakerClient = function() {
  var name = "decisionMaker", plural = "decisionMakers";

  var fetchAll = function(params, callback) {
    BaseClient.get("decision_makers", params, function(data) {
      store.dispatch({
        type: "DECISIONMAKERS",
        decisionMakers: data
      })
      if (callback) callback(data)
    })
  }

  var fetchOne = function(id, callback) {
    BaseClient.get("decision_makers/" + id, {}, function(data) {
      store.dispatch({
        type: "DECISIONMAKER",
        decisionMaker: data
      })
      if (callback) callback(data)
    })
  }

  var create = function(params, callback) {
    BaseClient.post("decision_makers", params, function(data) {
      if (!data.error) {
        store.dispatch({
          type: "NEW_DECISIONMAKER",
          decisionMaker: data
        })
      }
      if (callback) callback(data)
    })
  }

  var update = function(id, params, callback) {
    BaseClient.put("decision_makers", id, params, function(data) {
      store.dispatch({
        type: "UPDATE_DECISIONMAKER",
        decisionMaker: data
      })
      if (callback) callback(data)
    })
  }

  var destroy = function(id, callback) {
    BaseClient.destroy("decision_makers", id, function(data) {
      store.dispatch({
        type: "DESTROY_DECISIONMAKER",
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

export default DecisionMakerClient
