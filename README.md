# hexo-renderer-sass-typesettings

[![Build Status](https://travis-ci.org/vandreleal/hexo-renderer-sass-typesettings.svg)](https://travis-ci.org/vandreleal/hexo-renderer-sass-typesettings)
[![NPM Version](https://badge.fury.io/js/hexo-renderer-sass-typesettings.svg)](http://badge.fury.io/js/hexo-renderer-sass-typesettings)
[![dependencies Status](https://david-dm.org/vandreleal/hexo-renderer-sass-typesettings/status.svg)](https://david-dm.org/vandreleal/hexo-renderer-sass-typesettings)
[![devDependencies Status](https://david-dm.org/vandreleal/hexo-renderer-sass-typesettings/dev-status.svg)](https://david-dm.org/vandreleal/hexo-renderer-sass-typesettings?type=dev)

[Sass] renderer plugin for [Hexo] with [Typesettings] support.

## Install
```sh
$ npm install hexo-renderer-sass-typesettings --save
```

## Usage
To enable [Typesettings] support you need to import it at the beginning of your stylesheet:

``` scss
@import 'typesettings';
```

## Config
This renderer supports all [node-sass] settings. Check out the [node-sass docs] for all available options. Anything specified under the key `typesettings` in your `_config.yml` files will
be passed to the `sass.render()` call.

### Example _config.yml
```yaml
typesettings:
  outputStyle: compressed
  indentedSyntax: false
  omitSourceMapUrl: true
  sourceMap: true
  sourceMapEmbed: false
  sourceMapContents: false
```

### Inheritance
The config object passed to [node-sass] is constructed by merging properties from
the following locations using a least-specific-first order:

1. Hardcoded Defaults (`{ outputStyle: 'nested', sourceComments: false }`)
2. Theme specific `_config.yml`
3. Blog root `_config.yml`

[Hexo]: http://hexo.io/
[Sass]: http://sass-lang.com/
[Typesettings]: http://typesettings.io/
[node-sass]: https://github.com/sass/node-sass
[node-sass docs]: https://github.com/sass/node-sass#options