var ClueClient = function(name, plural, store, client) {

  var createLevel = function(id, description, level, callback) {
    client.put(plural, id + "/level", {description: description, level: level}, function(data) {
      store.dispatch({
        type: "UPDATE_CLUE",
        clue: data
      })
      if (callback) callback(data)
    })
  }

  var updateLevel = function(id, description, level, callback) {
    client.put(plural + "/level", id, {description: description, level: level}, function(data) {
      store.dispatch({
        type: "UPDATE_CLUE",
        clue: data
      })
      if (callback) callback(data)
    })
  }

  var destroyLevel = function(id, callback) {
    client.destroy(plural + "/level", id, function(data) {
      store.dispatch({
        type: "UPDATE_CLUE",
        clue: data
      })
      if (callback) callback(data)
    })
  }

  var sortLevels = function(id, level_id, direction, callback) {
    client.put(plural, "level/" + id + "/" + direction + "/" + level_id, {}, function(data) {
      store.dispatch({
        type: "UPDATE_CLUE",
        clue: data
      })
      if (callback) callback(data)
    })
  }

  return {
    createLevel: createLevel,
    updateLevel: updateLevel,
    destroyLevel: destroyLevel,
    sortLevels: sortLevels,
  }

}

export default ClueClient
