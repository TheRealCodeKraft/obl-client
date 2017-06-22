import BaseClient from './base'

import store from 'reducers/index';

var AreaClient = function() {
  var areas = function(params, callback) {
    BaseClient.get("areas", params, function(data) {
      store.dispatch({
        type: "AREAS",
        areas: data
      })
      if (callback) callback(data)
    })
  }

  return {
    areas: areas,
  }

}()

export default AreaClient
