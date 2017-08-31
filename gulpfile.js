// https://coderwall.com/p/0vlbxq/using-gulp-with-browserify-and-watchify
// https://www.sitepoint.com/getting-started-browserify/

const gulp = require('gulp');
const browserSync = require('browser-sync');
const browserify = require('browserify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const sourceFile = 'app.js';
const destFolder = './';
const destFile = 'findem.js';

gulp.task('default', ['watch', 'serve', 'browserify']);

gulp.task('browserify', function() {

  var bundler = browserify({
    // Required watchify args
    cache: {}, packageCache: {}, fullPaths: true,
  });

  var bundle = function() {
    return bundler
      .bundle()
      .pipe(source('app.js'))
      .pipe(gulp.dest('bundle.js'));
  };

  if(global.isWatching) {
    bundler = watchify(bundler);
    bundler.on('update', bundle);
  }

  return bundle();
});

gulp.task('watch', () => {
  gulp.watch('./**/*.css', ['css']);
  gulp.watch('./**/*.js', ['js']);
});

gulp.task('css', () => {
  return gulp
          .src('style.css')
          .pipe(browserSync.stream());
});

gulp.task('js', ()=> {
  return gulp
          .src('app.js')
          .pipe(browserSync.stream());
});

gulp.task('serve', ()=> {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
})
