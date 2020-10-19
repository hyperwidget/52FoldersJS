//Basic call to api to send XML requests to server for CRUD values
var API = {
  fetch: function (path, callback) {
    var uri = BASE_URI + "/" + path;
    var request = new XMLHttpRequest();

    request.open("GET", uri, true);
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        callback(JSON.parse(request.response));
      }
    };

    request.onerror = function () {
      reject(new Error("Something Went wrong on the API"));
    };

    request.send();
  },
  post: function (path, data, callback) {
    var uri = BASE_URI + "/" + path;
    var request = new XMLHttpRequest();

    request.open("POST", uri, true);
    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        callback(JSON.parse(request.response));
      }
    };

    request.onerror = function () {
      reject(new Error("Something Went wrong on the API"));
    };

    request.send(data);
  },
};
