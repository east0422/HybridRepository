// https://github.com/shelljs/shelljs
require('shelljs/global')
process.env.targetEnv = process.argv[2] || 'prod'

const path = require('path')
const config = require('../config')
const ora = require('ora')
const webpack = require('webpack')
const webpackConfig = require('./webpack.prod.conf')

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

const spinner = ora('building for ' + env.targetEnv + '...')
spinner.start()

const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
  exit(stats.compilation.errors.length)
})
