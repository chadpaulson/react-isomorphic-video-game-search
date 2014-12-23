'use strict'

var del = require('del')
var gulp = require('gulp')
var react = require('gulp-react')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var vinylPaths = require('vinyl-paths')
var runSequence = require('run-sequence')


gulp.task('cleanPublic', function() {
  return gulp.src('public/js/behavior.*js').pipe(vinylPaths(del))
})

gulp.task('cleanBuild', function() {
  return gulp.src('react/build').pipe(vinylPaths(del))
})

gulp.task('buildjs', function() {
  return gulp.src('react/src/*.jsx').pipe(react()).pipe(gulp.dest('react/build'))
})

gulp.task('copydeps', function() {
  return gulp.src([
    './react/src/stores/*.*',
    './react/src/actions/*.*',
    './react/src/config/*.*'
    ], {base: './react/src'}).pipe(gulp.dest('react/build'))
})

gulp.task('bundle', function() {
  return browserify('./react/build/app.js').bundle().pipe(source('behavior.js')).pipe(gulp.dest('public/js'))
})

gulp.task('bundlemin', function() {
  return gulp.src('public/js/behavior.js').pipe(uglify()).pipe(rename('behavior.min.js')).pipe(gulp.dest('public/js'))
})

gulp.task('default', function() {
  return runSequence('cleanPublic','cleanBuild','buildjs','copydeps','bundle','bundlemin')
})
