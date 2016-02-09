// load gulp dependancies
var gulp = require('gulp');
    gutil = require('gulp-util');
    batch = require('gulp-batch');
    cache = require('gulp-cached');
    imagemin = require('gulp-imagemin');
    watch = require('gulp-watch');
    open = require('gulp-open');
    svgmin = require('gulp-svgmin');
    sass = require('gulp-sass');
    //urlencode = require('urlencode-stream');

// path variables
path = {
    dist: './dist/**/*.scss',
    assets: {
        src: './source/svg/*.svg',
        dest: './source/processed'
    },
    test: {
        sass: './test/scss/*.scss',
        dest: './test'
    }
};

// default and build tasks
gulp.task('default', ['watch']);
gulp.task('svg', ['build-svg']);

gulp.task('watch', function () {
    watch(path.assets.src, batch(function (events, done) {
        gulp.start('build-svg', done);
    }));
    gulp.watch(path.dist, ['build-css']);
    gulp.watch(path.test.sass, ['build-css']);
});

// optimize svg and open in editor
var customURIGenerator = function(data){
    return encodeURIComponent(data).replace(/%2F/g, "/");
};
gulp.task('build-svg', function() {
    return gulp.src(path.assets.src)
    .pipe(watch(path.assets.src))
    .pipe(cache('svg'))
    .pipe(imagemin())
    //.pipe(new urlencode())
    .pipe(gulp.dest(path.assets.dest))
    .pipe(open({app: 'Sublime Text'}));
});


// build CSS Test file
gulp.task('build-css', function() {
    return gulp.src(path.test.sass)
    .pipe(cache('scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.test.dest + '/css'))
});



