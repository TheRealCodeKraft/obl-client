import BaseClient from './base'

import store from 'reducers/index';

import Auth from './auth'

var UserClient = function() {
  var signup = function(params, callback) {
    BaseClient.post("users", params, callback)
  }

  var me = function(callback) {
    BaseClient.get("users/me", {}, function(data) {
      store.dispatch({
        type: "ME",
        user: data
      })
    })
  }

  return {
    signup: signup,
    me: me
  }

}();

export default UserClient;
