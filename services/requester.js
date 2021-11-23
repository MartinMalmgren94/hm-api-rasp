const axios = require("axios");

function getRequest(url, callback) {
  axios
    .get(url)
    // getting response from the http request.
    .then((response) => {
      console.log(response);
      callback(response);
    })
    // catching error if that happens
    .catch((err) => {
      console.log(err);
      callback(err);
    });
}
function postRequest(url, body, callback) {
  axios
    .post(url, body)
    // getting response from the http request.
    .then((response) => {
      console.log(response)
      callback(response);
    })
    // catching error if that happens
    .catch((err) => {
      console.log(err);
      callback(null);
    });
}
// export selected functions
module.exports = { getRequest, postRequest };
