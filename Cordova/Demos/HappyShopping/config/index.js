// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')
const targetEnv = process.env.targetEnv || 'prod'

module.exports = {
  build: {
    env: require('./' + targetEnv + '.env'),
    index: path.resolve(__dirname, '../dist/www/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist/www'),
    assetsSubDirectory: '',
    assetsPublicPath: '',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    cordova: {
      appname: '聪明购',
      appid: 'com.east.happyshopping',
      app_ver_build: 0
    }
  },
  dev: {
    env: require('./dev.env'),
    port: 8000,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: true
  }
}