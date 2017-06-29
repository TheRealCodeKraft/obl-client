import BaseClient from './base'

import store from 'reducers/index';

var GameClient = function() {
  var name = "game", plural = "games";

  var fetchAll = function(params, callback) {
    BaseClient.get(name + "s", params, function(data) {
      store.dispatch({
        type: "GAMES",
        games: data
      })
      if (callback) callback(data)
    })
  }

  var create = function(params, callback) {
    BaseClient.post(plural, params, function(data) {
      store.dispatch({
        type: "NEW_GAME",
        game: data
      })
      if (callback) callback(data)
    })
  }

  var update = function(id, params, callback) {
    BaseClient.put(plural, id, params, function(data) {
      store.dispatch({
        type: "UPDATE_GAME",
        game: data
      })
      if (callback) callback(data)
    })
  }

  var destroy = function(id, callback) {
    BaseClient.destroy(plural, id, function(data) {
      store.dispatch({
        type: "DESTROY_GAME",
        id: data.id
      })
      if (callback) callback(data)
    })
  }

  return {
    name: name,

    fetchAll: fetchAll,
    create: create,
    update: update,
    destroy: destroy
  }

}()

export default GameClient
