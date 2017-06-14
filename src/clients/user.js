import BaseClient from './base'

import Auth from './auth'

var UserClient = function() {
  var signup = function(params, callback) {
    BaseClient.post("users", params, callback)
  }

  var login = function(params, callback) {
    params["grant_type"] = "password"
    BaseClient.post("oauth/token", params, function(data) {
      Auth.storeToken(data, callback)
    }, false, true)
  }

  return {
    signup: signup,
    login: login
  }

}();

export default UserClient;
