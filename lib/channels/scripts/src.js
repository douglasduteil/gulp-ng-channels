'use strict';

var resolve = require('resolve');
var gulp = require(resolve.sync('gulp', { basedir: process.cwd() }));

//
// Required modules

var combine = require('stream-combiner');
var sourcemaps = require('gulp-sourcemaps');

module.exports = function scriptSrcChannel(config) {
  var src = config.src;

  return combine(
    sourcemaps.init(),
    require('./base')(config),
    sourcemaps.write(),
    gulp.dest(src.tmp)
  );
};

