module.exports = {
  spake: function (args, successCallback) {
    cordova.exec(successCallback, null, 'BaiduTTS', 'spake', [args]);
  },
  stop: function (successCallback) {
    cordova.exec(successCallback, null, 'BaiduTTS', 'stop', []);
  },
  pause: function (successCallback) {
    cordova.exec(successCallback, null, 'BaiduTTS', 'pause', []);
  },
  resume: function (successCallback) {
    cordova.exec(successCallback, null, 'BaiduTTS', 'resume', []);
  },
}
