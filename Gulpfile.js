var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    cssmin = require('gulp-cssmin'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    runSequence = require('run-sequence'),
    webpack = require('gulp-webpack'),
    clean = require('gulp-clean');

var buildDir = './build';
var assets = '/assets';
var srcPath = './src' + assets;
var buildAssets = buildDir + assets;
var paths = {
    js: [
        srcPath + '/js/*.js',
        srcPath + '/js/modules/*.js',
        '!' + srcPath + '/js/*.min.js',
        '!' + srcPath + '/js/modules/*.min.js'],
    css: [srcPath + '/styles/*.css', '!' + srcPath + '/styles/*.min.css']
};

var vendorsLib = {
    js: [
        './node_modules/jquery/dist/jquery.min.js'
    ]
};

gulp.task('cleanBuild', function () {
    return gulp.src(buildDir, {read: false})
        .pipe(clean());
});

gulp.task('jshint', function () {
    return gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('cssTask', function () {
    return gulp.src(paths.css)
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(concat('style.all.min.css'))
        .pipe(gulp.dest(buildAssets + '/css'));
});

gulp.task('copyVendorLibs', function () {
    return gulp.src(vendorsLib.js)
        .pipe(gulp.dest(buildAssets + '/js/vendor/'));
});


gulp.task('webpack', function () {
    return gulp.src(paths.js)
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(buildAssets + '/js'));
});

gulp.task('copyIndex', function () {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest(buildDir));
});

gulp.task('img-compress', function () {
    return gulp.src(srcPath + '/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest(buildAssets + '/images'))
});

gulp.task('build-html', function () {
    return true;
});

gulp.task('build', function () {
    runSequence('cleanBuild',
        [ 'webpack', 'copyIndex', 'jshint', 'copyVendorLibs', 'cssTask', 'img-compress'], 'build-html');
});

gulp.task('watch', function () {
    gulp.watch(paths.js, ['jshint', 'webpack']);
});

gulp.task('default', ['build', 'watch']);