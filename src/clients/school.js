import BaseClient from './base'

import store from 'reducers/index';

var SchoolClient = function() {
  var schools = function(params, callback) {
    BaseClient.get("schools", params, function(data) {
      store.dispatch({
        type: "SCHOOLS",
        schools: data
      })
      if (callback) callback(data)
    })
  }

  return {
    schools: schools,
  }

}()

export default SchoolClient
