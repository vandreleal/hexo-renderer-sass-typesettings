'use strict'

var path = require('path')
var sass = require('node-sass')
var extend = require('util')._extend
var tsPath = path.join(__dirname, '/../node_modules/typesettings')

// includes typesettings paths to node-sass config.
module.exports = function (data, options) {
  var self = this
  var themeConfig = self.theme.config || {}

  // support global and theme-specific config
  var userConfig = extend(
    themeConfig.typesettings || {},
    self.config.typesettings || {}
  )

  var config = extend({
    data: data.text,
    file: data.path,
    outputStyle: 'nested',
    sourceComments: false,
    includePaths: [tsPath]
  }, userConfig)

  try {
    var result = sass.renderSync(config)
    return result.css.toString()
  } catch (error) {
    console.error(error.toString())
    throw error
  }
}
