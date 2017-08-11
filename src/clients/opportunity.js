import BaseClient from './base'

import store from 'reducers/index';

var OpportunityClient = function() {
  var name = "opportunity", plural = "opportunities";

  var fetchAll = function(params, callback) {
    BaseClient.get("opportunities", params, function(data) {
      store.dispatch({
        type: "OPPORTUNITIES",
        opportunities: data
      })
      if (callback) callback(data)
    })
  }

  var fetchOne = function(id, callback) {
    BaseClient.get("opportunities/" + id, {}, function(data) {
      store.dispatch({
        type: "OPPORTUNITY",
        opportunity: data
      })
      if (callback) callback(data)
    })
  }

  var create = function(params, callback) {
    BaseClient.post(plural, params, function(data) {
      if (!data.error) {
        store.dispatch({
          type: "NEW_OPPORTUNITY",
          opportunity: data
        })
      }
      if (callback) callback(data)
    })
  }

  var update = function(id, params, callback) {
    BaseClient.put(plural, id, params, function(data) {
      store.dispatch({
        type: "UPDATE_OPPORTUNITY",
        opportunity: data
      })
      if (callback) callback(data)
    })
  }

  var destroy = function(id, callback) {
    BaseClient.destroy(plural, id, function(data) {
      store.dispatch({
        type: "DESTROY_OPPORTUNITY",
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

export default OpportunityClient
