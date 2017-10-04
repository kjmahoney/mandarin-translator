const gulp = require('gulp');
const browserSync = require('browser-sync');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');

gulp.task('default', ['watch', 'serve']);

gulp.task('bundle', function() {
  return browserify('./app')
          .bundle()
          .pipe(source('bundle.js'))
          .pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
  return gulp.src('sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('watch', () => {
  gulp.watch('./**/*.css', ['css']);
  gulp.watch('./**/*.html', ['html']);
  gulp.watch('./**/*.js', ['js', 'bundle']);
  gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('css', () => {
  return gulp
          .src('style.css')
          .pipe(browserSync.stream());
});

gulp.task('html', () => {
  return gulp
          .src('index.html')
          .pipe(browserSync.stream());
});

gulp.task('js', ()=> {
  return gulp
          .src('app.js')
          .pipe(browserSync.stream());
});

gulp.task('serve', ()=> {
  browserSync.init({
    port: 9000,
    proxy: 'localhost:4000'
  })
})
