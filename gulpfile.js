// gulpfile.jsw
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');

gulp.task('build', function(){
	browserify({
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

gulp.task('default',['build']);

gulp.task('bs-reload',function(){
	browserSync.reload();
});

gulp.task('watch', function() {
  
  gulp.watch('./**/*.jsx', ['build']);
  gulp.watch('./**/*.html', ['bs-reload']);

	browserSync.init({
    server: "./"
  });

});