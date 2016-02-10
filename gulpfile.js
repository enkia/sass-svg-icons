// load gulp dependancies
var gulp = require('gulp');
    gutil = require('gulp-util');
    browserSync = require('browser-sync').create();
    cache = require('gulp-cached');
    imagemin = require('gulp-imagemin');
    watch = require('gulp-watch');
    open = require('gulp-open');
    sass = require('gulp-sass');
    rimraf = require('gulp-rimraf');
    rename = require('gulp-rename');

//  config variables
var editor = 'Sublime Text';
var path = {
    dist: './dist/**/*.scss',
    assets: {
        src: './source/*.svg',
        dest: './source/svg'
    },
    test: {
        sass: './test/scss/*.scss',
        dest: './test',
        index: 'test.html'
    }
};

// default watch task
gulp.task('default', ['watch', 'browser-sync']);

// initialize browsersync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: path.test.dest,
        index: path.test.index,
        browser: "safari",
        notify: false
    });
});

// watch task
gulp.task('watch', function () {
    watch(path.assets.src, function() {
        gulp.start('build-svg');
        gulp.start('open-file');
    });
    gulp.watch(path.dist, ['build-css']);
    gulp.watch(path.test.sass, ['build-css']);
});


var customURIGenerator = function(data){
    return encodeURIComponent(data).replace(/%2F/g, "/");
};

// optimize svg and open in editor
gulp.task('build-svg', function() {
    return gulp.src(path.assets.src)
    .pipe(cache('svg'))
    .pipe(imagemin())
    //.pipe(customURIGenerator())
    .pipe(rename(function(path) {
        path.basename = 'icon';
    }))
    .pipe(gulp.dest(path.assets.dest));
});

// open new svg file in editor
gulp.task('open-file', ['build-svg'], function() {
    gulp.src(path.assets.dest + '/icon.svg')
    .pipe(open({app: editor}));
    return
});

// build CSS Test file
gulp.task('build-css', function() {
    return gulp.src(path.test.sass)
    .pipe(cache('scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.test.dest + '/css'))
    .pipe(browserSync.stream());
});

gulp.task('clean', function() {
    return gulp.src('./source/**/*.svg', { read: false })
    .pipe(rimraf());
});


