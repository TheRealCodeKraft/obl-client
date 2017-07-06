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

  var upload = function(id, fieldName, file, callback) {
    BaseClient.upload(plural + '/' + id + '/' + fieldName, fieldName, file, function(data) {
      store.dispatch({
        type: "UPLOAD_FILE",
        game: data
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
    upload: upload
  }

}()

export default GameClient
