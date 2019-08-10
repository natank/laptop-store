const {
  series
} = require('gulp');
const gulp = require('gulp');

const html2pug = require('gulp-html2pug');

function pug() {
  return gulp.src('app/view/*.pug')
    .pipe(gulp.dest('dist/'))
}

exports.pug = series(pug)