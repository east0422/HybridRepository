var exec = require('cordova/exec');

module.exports = {
  setEnabled: function (value) {
    return new Promise(function (resolve, reject) {
      exec(resolve, reject, 'SleepControl', 'setEnabled', [value]);
    });
  }
}
