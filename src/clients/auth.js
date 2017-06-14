import BaseClient from './base'
import StorageService from 'clients/storage/storage'
const STORAGE_KEY_FOR_TOKEN = "token";

var Auth = function() {

  var refreshToken = function(callback) {
    var refresh_token = getToken().refresh_token
console.log(refresh_token)
    BaseClient.post("oauth/token", { grant_type: "refresh_token", refresh_token: refresh_token}, callback);
  }

  var storeToken = function(data, callback) {
    setToken(data)
    callback(data)
  }

  var checkLoggedIn = function() {
    var token = StorageService.get(STORAGE_KEY_FOR_TOKEN)
    //console.dir(token);
    if (token) {
      
      var currentTimestamp = parseInt(new Date().getTime() / 1000);
      var  expireTimestamp = token.created_at + (token.expires_in / 2);

      if(currentTimestamp >= expireTimestamp) {
        return "toRefresh";
      }

      return true

    } else { return false }
  }

  var logout = function() {
    StorageService.delete(STORAGE_KEY_FOR_TOKEN)
  }

  var getToken = function() {
    return JSON.parse(StorageService.get(STORAGE_KEY_FOR_TOKEN))
  }

  var setToken = function(token) {
    StorageService.set(STORAGE_KEY_FOR_TOKEN, JSON.stringify(token));
  }

  return {
    refreshToken: refreshToken,
    storeToken: storeToken,
    checkLoggedIn: checkLoggedIn,
    logout: logout
  }
}()

export default Auth
