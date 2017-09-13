var GameClient = function(name, plural, store, client) {

  var upload = function(id, fieldName, file, callback) {
    client.upload(plural + '/' + id + '/' + fieldName, fieldName, file, function(data) {
      store.dispatch({
        type: "UPDATE_GAME",
        game: data
      })
      if (callback) callback(data)
    })
  }

  return {
    upload: upload
  }

}

export default GameClient
