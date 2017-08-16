import configs from 'config'

import Logger from 'js-logger'

import StorageService from 'clients/storage/storage'
const STORAGE_KEY_FOR_TOKEN = "token";

import Auth from './auth'

var BaseClient = function() {
  var call = function(method, endpoint, params, callback, offline=false, defaultParams=false) {
    var headers = {
    }

    if (!(params instanceof FormData)) {
      headers['Content-Type'] = 'application/json'
    }

    if (offline) {
        headers['Authorization'] = 'bearer ' + configs.api.app_token
    } else {
      if (defaultParams) {
        params['client_id'] = configs.api.clientId
        params['client_secret'] = configs.api.clientSecret
        params['grant_type'] = 'password'
      } else {
        var token = JSON.parse(StorageService.get(STORAGE_KEY_FOR_TOKEN)).access_token
        headers['Authorization'] = 'bearer ' + token
      }
    }
    var fetchParams = {
      method: method,
      headers: headers,
    }

    switch(method) {
      case "post":
      case "put":
      case "patch":
        if (!(params instanceof FormData)) {
          fetchParams.body = JSON.stringify(params)
        } else {
          fetchParams.body = params
        }
        break
      case "get":
        if (params !== undefined && params.length > 0) {
          var keys = Object.getKeys(params)
          for(var paramIndex in keys) {
            endpoint += (paramIndex === 0 ? "?" : "&")
            endpoint += keys[paramIndex] + "=" + params[keys[paramIndex]]
          }
        }
        break
      default:
        break
    }

    Logger.debug({
      method: method,
      request: endpoint,
      headers: headers,
      data: params
    })

    fetch(configs.api.url + endpoint, fetchParams)
    .then(promise => {
      promise.json().then(response => {

        Logger.debug({
          method: method,
          response: endpoint,
          data: response
        })  

        if (response.error) {
          if (response.error === "The access token expired") {
            Auth.refreshToken(callback)
          } else if (response.error === "The access token is invalid") {
            Auth.logout(callback)
          } else {
            callback(response)
          }
        } else if (callback) callback(response);
      });
    }).catch(exception => {

      Logger.debug({
        method: method,
        response: endpoint,
        exception: exception
      })  

      if (callback) callback({error: true, message: exception.message});
    });
    return;
  }

  var post = function(endpoint, params, callback, offline=false, defaultParams=false) {
    return call("post", endpoint, params, callback, offline, defaultParams)
  }

  var get = function(endpoint, params, callback, offline=false) {
    return call("get", endpoint, params, callback, offline)
  }

  var put = function(endpoint, id, params, callback) {
    return call("put", endpoint + (id ? ("/" + id) : ""), params, callback)
  }

  var patch = function(endpoint, id, params, callback) {
    return call("patch", endpoint + (id ? ("/" + id) : ""), params, callback)
  }

  var destroy = function(endpoint, id, callback) {
    return call("delete", endpoint + "/" + id, undefined, callback)
  }

  var upload = function(endpoint, fieldName, file, callback) {
    var data = new FormData(); 
    data.append(fieldName, file)
    return call("put", endpoint, data, callback)
  }

  return {
    get: get,
    post: post,
    put: put,
    patch: patch,
    destroy: destroy,
    upload: upload
  }
}();

export default BaseClient;
