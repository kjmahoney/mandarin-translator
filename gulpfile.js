const gulp = require('gulp');
const browserSync = require('browser-sync');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');

gulp.task('default', ['watch', 'serve']);

gulp.task('bundle', function() {
  return browserify('./public/js/app')
          .bundle()
          .pipe(source('bundle.js'))
          .pipe(gulp.dest('./public/js/'));
});

gulp.task('sass', function () {
  return gulp.src('public/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('public/sass/**/*.scss', ['sass']);
});

gulp.task('watch', () => {
  gulp.watch('./**/*.css', ['css']);
  gulp.watch('./**/*.html', ['html']);
  gulp.watch('./**/*.js', ['js', 'bundle']);
  gulp.watch('public/sass/**/*.scss', ['sass']);
});

gulp.task('css', () => {
  return gulp
          .src('public/css/*.css')
          .pipe(browserSync.stream());
});

gulp.task('html', () => {
  return gulp
          .src('index.html')
          .pipe(browserSync.stream());
});

gulp.task('js', () => {
  return gulp
          .src('public/js/app.js')
          .pipe(browserSync.stream());
});

gulp.task('serve', ()=> {
  browserSync.init({
    port: 9000,
    proxy: 'localhost:4000'
  })
})
