const gulp = require('gulp');
const browserSync = require('browser-sync');
const browserify = require('browserify');
const es = require('event-stream');
const glob = require('glob');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');

gulp.task('default', ['watch', 'serve']);

gulp.task('bundle', function(done) {

  glob('./public/js/**.js', (err, files) => {
    if(err) done(err);

  const tasks = files.map((entry) => {
    console.log('HERE' + entry);
    return browserify({entries: [entry]})
          .bundle()
          .pipe(source(entry))
          .pipe(rename('bundle.js'))
        .pipe(gulp.dest('./public'));
  });
  es.merge(tasks).on('end', done);
})
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
