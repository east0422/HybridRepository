module.exports = {
  getAngle: function (successCallback) {
    cordova.exec(successCallback, null, 'Gyroscope', 'getAngle', []);
  },
  start: function () {
    cordova.exec(null, null, 'Gyroscope', 'start', []);
  },
  stop: function () {
    cordova.exec(null, null, 'Gyroscope', 'stop', []);
  },
}
