var ScenarioClient = function(name, plural, store, client) {

  var upload = function(id, fieldName, file, callback) {
    client.put(plural + '/vts-archive-coming', id, {}, function(data) {
      store.dispatch({
        type: "UPDATE_SCENARIO",
        scenario: data
      })

      client.upload(plural + '/' + id + '/' + fieldName, fieldName, file, function(data) {
        store.dispatch({
          type: "UPDATE_SCENARIO",
          game: data
        })
        if (callback) callback(data)
      })
    })
  }

  return {
    upload: upload,
  }

}

export default ScenarioClient
