// gulpfile.js
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');

gulp.task('build', function(){
	return browserify({
		entries: 'index.jsx',
		extensions: ['.jsx'],
		debug: true
	})
	.transform(babelify)
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({ stream: true, once: true }));
});

gulp.task('compress', function() {
  return gulp.src('./dist/bundle.js')
  	.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
	  .pipe(gulp.dest('dist'));
});

gulp.task('bs-reload',function(){
	browserSync.reload();
});

gulp.task('default', function(cb) {
  runSequence('build','compress', cb);
});

gulp.task('watch', function() {
  
  gulp.watch('./**/*.jsx', ['build']);
  gulp.watch('./**/*.html', ['bs-reload']);

	browserSync.init({
    server: "./"
  });

});