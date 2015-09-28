var gulp = require("gulp");
var babel = require("gulp-babel");
var del = require('del');

var paths = {
	js: ['src/*.js', 'src/private/js/**/*.js', '!src/public/js/vendor/**/*.js']
};

gulp.task('clean', function() {
	return del('build');
});

// JS Files
gulp.task("babel", function () {
  return gulp.src(paths.js)
    .pipe(babel())
    .pipe(gulp.dest("build"));
});

gulp.task('vendor:js', function() {
	return gulp.src(['src/public/js/vendor/**/*.js', 'src/private/js/vendor/**/*.js'], {base:'src'})
		.pipe(gulp.dest('build'));
});

gulp.task('build:js', ['babel', 'vendor:js']);

// HTML
gulp.task("views", function() {
	return gulp.src("src/public/views/**/*.jade")
		.pipe(gulp.dest("build/public/views"));
});

gulp.task('default', ['build:js', 'views'], function() {
	gulp.watch(paths.js, ["babel"]);
	gulp.watch("src/views/**/*.jade", ["views"]);
});