import BaseClient from './base'

import store from 'reducers/index';

var GameClient = function() {
  var games = function(params, callback) {
    BaseClient.get("games", params, function(data) {
      store.dispatch({
        type: "GAMES",
        games: data
      })
      if (callback) callback(data)
    })
  }

  return {
    games: games,
  }

}()

export default GameClient
