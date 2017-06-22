import BaseClient from './base'

import store from 'reducers/index';

var SpecialityClient = function() {
  var specialities = function(params, callback) {
    BaseClient.get("specialities", params, function(data) {
      store.dispatch({
        type: "SPECIALITIES",
        specialities: data
      })
      if (callback) callback(data)
    })
  }

  return {
    specialities: specialities,
  }

}()

export default SpecialityClient
