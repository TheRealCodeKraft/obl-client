import BaseClient from './base'

var UserClient = function() {
  var signup = function(params, callback) {
    BaseClient.post("/users", params, callback)
  }

  return {
    signup: signup
  }

}();

export default UserClient;
