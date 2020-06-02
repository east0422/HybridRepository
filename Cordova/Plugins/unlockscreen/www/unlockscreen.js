var exec = require('cordova/exec');

module.exports = {
  keepScreenOn: function () {
    return new Promise(function (resolve, reject) {
      cordova.exec(resolve, reject, 'UnlockScreen', 'keepScreenOn', []);
    });
  },
  clearScreenOn: function () {
    return new Promise(function (resolve, reject) {
      cordova.exec(resolve, reject, 'UnlockScreen', 'clearScreenOn', []);
    });
  },
  lock: function () {
    return new Promise(function (resolve, reject) {
      cordova.exec(resolve, reject, 'UnlockScreen', 'lock', []);
    });
  },
  unLock: function () {
    return new Promise(function (resolve, reject) {
      cordova.exec(resolve, reject, 'UnlockScreen', 'unLock', []);
    });
  }
}
