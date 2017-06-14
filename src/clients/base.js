import configs from 'config'

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
        headers['Authorization'] = 'bearer 11dec774b37a3dd9e0d26e1a57796f1d46cbf71a74146bdd5a90b11ffe2abfb2'
      }
    }
    var fetchParams = {
      method: 'post',
      headers: headers,
      body: JSON.stringify(params)
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

  return {
    post: post
  }
}();

export default BaseClient;
