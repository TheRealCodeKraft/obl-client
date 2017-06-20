import configs from 'config'

import StorageService from 'clients/storage/storage'
const STORAGE_KEY_FOR_TOKEN = "token";

var BaseClient = function() {
  var call = function(method, endpoint, params, callback, offline=false, defaultParams=false) {
    var headers = {
      'Content-Type': 'application/json'
    }

    if (offline) {
    } else {
      if (defaultParams) {
        params['client_id'] = configs.api.clientId
        params['client_secret'] = configs.api.clientSecret
        params['grant_type'] = 'password'
      } else {
        var token = JSON.parse(StorageService.get(STORAGE_KEY_FOR_TOKEN)).access_token
        headers['Authorization'] = 'bearer ' + token//11dec774b37a3dd9e0d26e1a57796f1d46cbf71a74146bdd5a90b11ffe2abfb2'
      }
    }
    var fetchParams = {
      method: method,
      headers: headers,
    }

    switch(method) {
      case "post":
        fetchParams.body = JSON.stringify(params)
        break
      case "get":
        if (params !== undefined && params.length > 0) {
          var keys = Object.getKeys(params)
          for(var paramIndex in keys) {
            endpoint += (paramIndex == 0 ? "?" : "&")
            endpoint += keys[paramIndex] + "=" + params[keys[paramIndex]]
          }
        }
        break
    }

    console.dir(fetchParams)

    fetch(configs.api.url + endpoint, fetchParams)
    .then(promise => {
      promise.json().then(response => {
        if (callback) callback(response);
      });
    }).catch(exception => {
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

  return {
    post: post,
    get: get
  }
}();

export default BaseClient;
