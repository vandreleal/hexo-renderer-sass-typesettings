'use strict'

/* eslint-env mocha */

var render = require('../lib/renderer')
var should = require('chai').should() // eslint-disable-line

describe('Sass Renderer with Typesettings', function () {
  var ctx = {
    config: {
      typesettings: {
        indentedSyntax: false,
        outputStyle: 'nested',
        sourceComments: false
      }
    },
    theme: {
      config: {
        typesettings: {
          omitSourceMapUrl: true,
          sourceMap: true,
          sourceMapEmbed: true,
          sourceMapContents: true
        }
      }
    }
  }

  var r = render.bind(ctx)

  it('[1] default: scss syntax', function () {
    var body = [
      '$color: red;',
      '.foo {',
      '  color: $color;',
      '}'
    ].join('\n')

    var result = r({ text: body, path: './somepath/path.scss' }, {})
    result.should.eql([
      '.foo {',
      '  color: red; }'
    ].join('\n') + '\n')
  })

  it('[2] default: sass syntax', function () {
    ctx.config = { typesettings: { indentedSyntax: true } }

    var body = [
      '$color: red',
      '.foo',
      '  color: $color'
    ].join('\n')

    var result = r({ text: body, path: './somepath/path.sass' }, {})
    result.should.eql([
      '.foo {',
      '  color: red; }'
    ].join('\n') + '\n')
  })

  it('[3] outputStyle compressed: scss syntax', function () {
    ctx.config = {}
    ctx.theme.config = { typesettings: { outputStyle: 'compressed' } }

    var body = [
      '$color: red;',
      '.foo {',
      '  color: $color;',
      '}'
    ].join('\n')

    var result = r({ text: body, path: './somepath/path.scss' }, {})
    result.should.eql([
      '.foo{color:red}'
    ].join('\n') + '\n')
  })

  it('[4] outputStyle compressed: sass syntax', function () {
    ctx.config = {}
    ctx.theme.config = { typesettings: { indentedSyntax: true, outputStyle: 'compressed' } }

    var body = [
      '$color: red',
      '.foo',
      '  color: $color'
    ].join('\n')

    var result = r({ text: body, path: './somepath/path.sass' }, {})
    result.should.eql([
      '.foo{color:red}'
    ].join('\n') + '\n')
  })

  it('[5] supports root config: scss syntax', function () {
    ctx.config = { typesettings: { outputStyle: 'compressed' } }
    ctx.theme.config = {}

    var body = [
      '$color: red;',
      '.foo {',
      '  color: $color;',
      '}'
    ].join('\n')

    var result = r({ text: body, path: './somepath/path.scss' }, {})
    result.should.eql([
      '.foo{color:red}'
    ].join('\n') + '\n')
  })

  it('[6] supports root config: sass syntax', function () {
    ctx.config = { typesettings: { indentedSyntax: true, outputStyle: 'compressed' } }
    ctx.theme.config = {}

    var body = [
      '$color: red',
      '.foo',
      '  color: $color'
    ].join('\n')

    var result = r({ text: body, path: './somepath/path.sass' }, {})
    result.should.eql([
      '.foo{color:red}'
    ].join('\n') + '\n')
  })

  it('[7] throw when error occurs: scss syntax', function () {
    ctx.config = {}
    ctx.theme.config = { typesettings: { outputStyle: 'compressed' } }

    var body = [
      '.foo {',
      '  color: $color;',
      '}'
    ].join('\n')

    should.Throw(function () {
      return r({ text: body, path: './somepath/path.scss' }, {})
    })
  })

  it('[8] throw when error occurs: sass syntax', function () {
    ctx.config = { typesettings: {} }
    ctx.theme.config = { typesettings: { outputStyle: 'compressed' } }

    var body = [
      '.foo',
      '  color: $color'
    ].join('\n')

    should.Throw(function () {
      return r({ text: body, path: './somepath/path.sass' }, {})
    })
  })
})
