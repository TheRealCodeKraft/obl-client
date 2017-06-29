import BaseClient from './base'

import store from 'reducers/index';

var GameClient = function() {
  var name = "game";

  var fetchAll = function(params, callback) {
    BaseClient.get("games", params, function(data) {
      store.dispatch({
        type: "GAMES",
        games: data
      })
      if (callback) callback(data)
    })
  }

  return {
    name: name,

    fetchAll: fetchAll,
  }

}()

export default GameClient
