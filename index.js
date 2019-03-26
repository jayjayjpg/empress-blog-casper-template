'use strict';

const autoprefixer = require('autoprefixer');
const colorFunction = require('postcss-color-function');
const cssnano = require('cssnano');
const customProperties = require('postcss-custom-properties');
const easyImport = require('postcss-easy-import');

const postcssOptions = {
  compile: {
    enable: true,
    plugins: [
      { module: easyImport },
      { module: customProperties, options: { preserve: false } },
      { module: colorFunction },
      { module: autoprefixer, options: { browsers: ['last 2 versions'] } },
      { module: cssnano },
    ]
  }
};

module.exports = {
  name: require('./package').name,

  options: {
    postcssOptions
  },

  config(env, config) {
    if(!config['responsive-image']) {
      return {
        'responsive-image': {
          sourceDir: 'images',
          destinationDir: 'responsive-images',
          quality: 80,
          supportedWidths: [2000, 1000, 600, 300],
          removeSourceDir: false,
          justCopy: false,
          extensions: ['jpg', 'jpeg', 'png', 'gif']
        }
      }
    }
  },

  included(app) {
    this._super.included.apply(this, arguments)

    app.options.postcssOptions = postcssOptions;
  },
};