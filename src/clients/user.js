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

  return {
    signup: signup,
    me: me,
    resetMe: resetMe
  }

}();

export default UserClient;
