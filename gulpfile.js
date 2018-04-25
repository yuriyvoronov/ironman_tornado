'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
const wiredep = require('gulp-wiredep');
var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-clean-css');
 
gulp.task('html', function () {
    return gulp.src('*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist/'));
});

gulp.task('images',function(){
	gulp.src('img/**/*.jpg')
		.pipe(gulp.dest('dist/img'));
	gulp.src('img/**/*.png')
		.pipe(gulp.dest('dist/img'));
});

gulp.task('fonts',function(){
	gulp.src('fonts/**/*.eot)')
		.pipe(gulp.dest('dist/fonts'));
	gulp.src('fonts/**/*.ttf)')
		.pipe(gulp.dest('dist/fonts'));
	gulp.src('fonts/**/*.woff)')
		.pipe(gulp.dest('dist/fonts'));
});
gulp.task('build', [
    'html',
    'images',
    'fonts'
    
]);
gulp.task('bower', function () {
  gulp.src('./*.html')
    .pipe(wiredep({
      directory: "./bower_components"
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});