import BaseClient from './base'

import store from 'reducers/index';

import Auth from './auth'

var UserClient = function() {
  var signup = function(params, callback) {
    BaseClient.post("users", params, callback, true)
  }

  var me = function(callback) {
    BaseClient.get("users/me", {}, function(data) {
      if (data.error) {

      } else {
        store.dispatch({
          type: "ME",
          user: data
        })
      }
    })
  }

  var resetMe = function(callback) {
    store.dispatch({
      type: "RESET_ME"
    })
  }

  var update = function(id, params, callback) {
    BaseClient.put("users", id, params, function(data) {
      if (!data.error) {
        store.dispatch({
          type: "ME",
          user: data
        })
      }
      if (callback) callback(data)
    })
  }

  var updatePassword = function(id, params, callback) {
    BaseClient.put("users/password", id, params, callback)
  }

  return {
    signup: signup,
    me: me,
    resetMe: resetMe,
    update: update,
    updatePassword: updatePassword
  }

}();

export default UserClient;
