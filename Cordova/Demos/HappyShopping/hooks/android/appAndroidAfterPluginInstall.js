#!/usr/bin/env node

module.exports = function (context) {
  var path = context.requireCordovaModule('path')
  var fs = context.requireCordovaModule('fs')
  var projectRoot = context.opts.projectRoot
  var plugins = context.opts.plugins || []

  // The plugins array will be empty during platform add
  if (plugins.length > 0 && plugins.indexOf('cordova-plugin-wechat') === -1) {
    return
  }

  var fullfilename = path.join(projectRoot, 'plugins/cordova-plugin-wechat/scripts/android-install.js')
  if (fs.existsSync(fullfilename)) {
    var data = fs.readFileSync(fullfilename, 'utf8')
    if (data.match('"android", "src", packageName')) {
      var result = data.replace(data.match('"android", "src", packageName'), '"android", "app", "src", "main", "java", packageName')
      fs.writeFileSync(fullfilename, result, 'utf8')
    }
  }
}
