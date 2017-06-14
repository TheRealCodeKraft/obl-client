import configs from 'config'

var BaseClient = function() {
  var post = function(endpoint, params, callback) {
console.dir(params);

    var fetchParams = {
      method: 'post',
      headers: {
        'Authorization': 'bearer 11dec774b37a3dd9e0d26e1a57796f1d46cbf71a74146bdd5a90b11ffe2abfb2',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }

    console.dir(fetchParams)

    fetch(configs.api.url + endpoint, fetchParams)
    .then(promise => {
      promise.json().then(response => {
          callback(response);
      });
    }).catch(exception => {
      callback({error: true, message: exception.message});
    });
    return;
  }

  return {
    post: post
  }
}();

export default BaseClient;
