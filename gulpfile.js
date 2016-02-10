// Load gulp dependancies
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
    clipboard = require('gulp-clipboard');
    es = require('event-stream');

//  Config variables
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

// Default watch task
gulp.task('default', ['watch', 'browser-sync']);

// Initialize browsersync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: path.test.dest,
        index: path.test.index,
        browser: "safari",
        notify: false
    });
});

// Watch task
gulp.task('watch', function () {
    watch(path.assets.src, function() {
        gulp.start('build-svg');
        //gulp.start('open-file');
    });
    gulp.watch(path.dist, ['build-css']);
    gulp.watch(path.test.sass, ['build-css']);
});


// Optimize svg, and copy to clipboard
gulp.task('build-svg', function() {
    return gulp.src(path.assets.src)
    .pipe(cache('svg'))
    .pipe(imagemin())
    .pipe(urlencode())
    .pipe(rename(function(path) {
        path.basename = 'icon';
    }))
    .pipe(clipboard())
    .pipe(gulp.dest(path.assets.dest));
});


// Open new svg file in editor
gulp.task('open-file', ['build-svg'], function() {
    gulp.src(path.assets.dest + '/icon.svg')
    .pipe(open({app: editor}));
    return
});

// Build CSS Test file
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




// URL encode
function urlencode() {
  function transform(file, cb) {
    file.contents = new Buffer(String(encodeURIComponent(file.contents)));
    cb(null, file);
  }
  return es.map(transform);
}

