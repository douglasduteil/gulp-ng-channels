'use strict';

//
// Required modules

var combine = require('stream-combiner');

//
// Gulp modules

var gulpif = require('gulp-if');
var rename = require('gulp-rename');

module.exports = function scriptBaseChannel(config) {
  var process = config.process || {
      pattern: false,
      transform: function () {return {};}
    };
  return combine(
    gulpif(process.pattern, process.transform(process.transformOptions)),
    gulpif(process.pattern, rename(function (path) { path.extname = '.js'; }))
  );
};
