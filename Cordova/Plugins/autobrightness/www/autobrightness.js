var exec = require('cordova/exec');

module.exports = {
  setBrightness: function (value) {
    return new Promise(function (resolve, reject) {
      cordova.exec(resolve, reject, 'AutoBrightness', 'setBrightness', [value]);
    });
  },

  clear: function () {
    return new Promise(function (resolve, reject) {
      cordova.exec(resolve, reject, 'AutoBrightness', 'clear', []);
    })
  }
}
