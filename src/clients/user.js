import BaseClient from './base'

import Auth from './auth'

var UserClient = function() {
  var signup = function(params, callback) {
    BaseClient.post("users", params, callback)
  }

  return {
    signup: signup
  }

}();

export default UserClient;
