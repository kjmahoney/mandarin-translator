const gulp = require('gulp');
const browserSync = require('browser-sync');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

gulp.task('default', ['watch', 'serve']);

gulp.task('bundle', function() {
  return browserify('./app')
          .bundle()
          .pipe(source('bundle.js'))
          .pipe(gulp.dest('./'));
})

gulp.task('watch', () => {
  gulp.watch('./**/*.css', ['css']);
  gulp.watch('./**/*.js', ['js', 'bundle']);
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
