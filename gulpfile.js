'use strict';
let path = require('path');
let gulp = require('gulp');
let gutil = require('gulp-util');
let textSimple = require('gulp-text-simple');
let sass = require('gulp-sass');
let rename = require('gulp-rename');
let image64 = require('@mohuk/gulp-image64')

let BASE_PATH = path.join('./');
let SRC_PATH = path.join(BASE_PATH, './src');

let PATHS = {
  TEMPLATES: path.join(SRC_PATH, '**/*.html'),
  SCSS: path.join(SRC_PATH, '**/*.{scss, sass}'),
}

function transformContentToTSFile(content, options){
  return [
    '/* tslint:disable */',
    'export default `',
      content,
    '`;'
  ].join('\n');
}

var transform = textSimple(transformContentToTSFile);

gulp.task('styles', () => {
  gutil.log(`watching ${PATHS.SCSS}`);
  return gulp.src(PATHS.SCSS)
    .pipe(sass().on('error', sass.logError))
    .pipe(transform())
    .pipe(rename({
      extname: '.style.ts'
    }))
    .pipe(gulp.dest(SRC_PATH));
})

gulp.task('templates', () => {
  gutil.log(`watching ${PATHS.TEMPLATES}`);
  return gulp.src(PATHS.TEMPLATES)
    .pipe(image64({lowerCaseAttributeNames: false}))
    .pipe(transform())
    .pipe(rename({
      extname: '.template.ts'
    }))
    .pipe(gulp.dest(SRC_PATH));
});

gulp.task('watch', () => {
  gulp.watch(PATHS.TEMPLATES, ['templates']);
  gulp.watch(PATHS.SCSS, ['styles']);
});

gulp.task('compile', ['styles', 'templates']);
