var gulp = require("gulp");
var babel = require("gulp-babel");
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var paths = {
	backendJs: ['src/*.js', 'src/private/js/**/*.js', 
		'!src/public/js/vendor/**/*.js'],
	vendorJs: ['src/public/js/vendor/**/*.js', 
		'src/private/js/vendor/**/*.js'],
	frontJs: 'src/public/js/vendor/**/*.js',
	jadeFiles: ['src/public/views/**/*.jade'],
	mapFiles: ['src/public/maps/**/*.json']
};

gulp.task('clean', function() {
	return del('build');
});

// JS Files
gulp.task('babelify', function () {
  return gulp.src(paths.backendJs)
    .pipe(babel())
    .pipe(gulp.dest('build'));
});

gulp.task('browserify', function() {
	return browserify('src/public/js/main.js')
			.bundle()
			.pipe(source('bundled.js'))
			.pipe(gulp.dest('build/public/js'));
});

gulp.task('vendor:js', function() {
	return gulp.src(paths.vendorJs, {base:'src'})
		.pipe(gulp.dest('build'));
});

gulp.task('build:js', ['babelify', 'browserify', 'vendor:js']);

// HTML
gulp.task('build:views', function() {
	return gulp.src(paths.jadeFiles)
		.pipe(gulp.dest('build/public/views'));
});

gulp.task('build:imgs', function() {
	return gulp.src('src/public/imgs/**/*.*')
		.pipe(gulp.dest('build/public/imgs'));
});

gulp.task('copy:maps', function() {
	return gulp.src(paths.mapFiles)
		.pipe(gulp.dest('build/public/maps'));
});

// Build steps
gulp.task('build', ['build:js', 'build:views', 'build:imgs', 'copy:maps']);

gulp.task('default', ['build'], function() {
	gulp.watch(paths.backendJs, ['babelify']);
	gulp.watch(paths.frontJs, ['browserify']);
	gulp.watch(paths.jadeFiles, ['build:views']);
	gulp.watch(paths.mapFiles, ['copy:maps']);
});