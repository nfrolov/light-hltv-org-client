'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const del = require('del');
const templatecache = require('gulp-angular-templatecache');

const browsersync = require('browser-sync').create();


gulp.task('clean', (cb) => {
  del('dist', cb);
});

gulp.task('build', ['scripts', 'pages']);

gulp.task('pages', () => {
  return gulp.src('app/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browsersync.stream());
});

gulp.task('templates', () => {
  return gulp.src('app/views/**/*.html')
    .pipe(templatecache({standalone: true}))
    .pipe(gulp.dest('app'));
});

gulp.task('scripts', ['templates'], () => {
  const b = browserify({
    entries: __dirname + '/app/main.js',
    basedir: __dirname,
    debug: true
  });

  b.transform('babelify');

  return b.bundle()
    .pipe(source('bundle.js'))
    // .pipe(buffer())
    // .pipe(sourcemaps.init())
    // .pipe(uglify({mangle: false}))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
    .pipe(browsersync.stream());
});

gulp.task('serve', ['watch'], (cb) => {
  browsersync.init({
    server: {
      baseDir: 'dist',
      middleware: [
        require('connect-history-api-fallback')()
      ]
    },
    open: false
  }, cb);
});

gulp.task('watch', ['build'], () => {
  watch('app/views/**/*.html', () => gulp.start(['templates', 'scripts']));
  watch('app/*.html', () => gulp.start('pages'));
  watch('app/**/*.js', () => gulp.start('scripts'));
});


gulp.task('default', ['build']);
