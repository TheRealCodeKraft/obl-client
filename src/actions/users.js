var UsersApi = function() {
  var searchFor = function(query, callback) {
    fetch("https://open-business-labs.herokuapp.com/v1/users/" + query, {
      method: 'get',
      headers: {
        'Authorization': 'bearer 11dec774b37a3dd9e0d26e1a57796f1d46cbf71a74146bdd5a90b11ffe2abfb2',
        'Content-Type': 'application/json'
      },
    }).then(promise => {
      promise.json().then(response => {
        callback(response);
      });
    }).catch(exception => {

    });
    return;
  }

  return {
    searchFor: searchFor
  }

}();

export default UsersApi;
