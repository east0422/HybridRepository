var exec = require('cordova/exec');

module.exports = {
  show: function (x, y, width, height, url) {
    return new Promise(function (resolve, reject) {
      cordova.exec(resolve, reject, 'Binoculars', 'show', [x, y, width, height, url]);
    });
  },
  loadUrl: function (url) {
    return new Promise(function (resolve, reject) {
      cordova.exec(resolve, reject, 'Binoculars', 'loadUrl', [url]);
    });
  },
  close: function () {
    return new Promise(function (resolve, reject) {
      cordova.exec(resolve, reject, 'Binoculars', 'close', []);
    })
  },

  eval: function (methodname, jsonparams) {
    return new Promise(function (resolve, reject) {
      cordova.exec(resolve, reject, 'Binoculars', 'eval', [methodname, jsonparams])
    });
  },
}
