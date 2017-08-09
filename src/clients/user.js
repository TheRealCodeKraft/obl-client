import BaseClient from './base'

import store from 'reducers/index';

var UserClient = function() {
  var name = "user", plural = "users";

  var fetchAll = function(params, callback) {
    BaseClient.get("users", params, function(data) {
      store.dispatch({
        type: "USERS",
        users: data
      })
      if (callback) callback(data)
    })
  }

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
    name: name,
    plural: plural,
    fetchAll: fetchAll,
    signup: signup,
    me: me,
    resetMe: resetMe,
    update: update,
    updatePassword: updatePassword
  }

}();

export default UserClient;
