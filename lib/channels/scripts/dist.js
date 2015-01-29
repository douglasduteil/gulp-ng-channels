'use strict';

//
// Required modules

var path = require('path');
var combine = require('stream-combiner');

var resolve = require('resolve');
var gulp = require(resolve.sync('gulp', { basedir: process.cwd() }));

//
// Gulp modules

var gulpif = require('gulp-if');
var concat = require('gulp-concat-util');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

module.exports = function scriptDistChannel(config) {

  var src = config.src;
  return combine(
    require('./base')(config),
    concat(config.pkg.name + '.js', { cwd: src.cwd }),

    // Process before uglifing

    //require('./sanitize')(config),
    uglify({
      output: { beautify: true, indent_level: 2 },
      mangle: false,
      compress: false
    }),
    concat.header(config.banner),
    gulp.dest(src.dest),
    uglify(),
    concat.header(config.banner),
    rename(function (path) { path.extname = '.min.js'; }),
    gulp.dest(src.dest)
  );
};
