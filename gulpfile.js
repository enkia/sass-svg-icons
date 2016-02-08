// load gulp dependancies
var gulp = require('gulp');
    gutil = require('gulp-util');
    batch = require('gulp-batch');
    cache = require('gulp-cached');
    imagemin = require('gulp-imagemin');
    watch = require('gulp-watch');
    open = require('gulp-open');
    svgmin = require('gulp-svgmin');
    urlencode = require('urlencode-stream');

// path variables
path = {
    assets: {
        src: './source/svg/*.svg',
        dest: './source/processed'
    }
};

// default and build tasks
gulp.task('default', ['watch']);
gulp.task('svg', ['build-svg']);

gulp.task('watch', function () {
    watch(path.assets.src, batch(function (events, done) {
        gulp.start('build-svg', done);
    }));
});


// optimize svg and open in editor
var customURIGenerator = function(data){
    return encodeURIComponent(data).replace(/%2F/g, "/");
};
gulp.task('build-svg', function() {
    return gulp.src(path.assets.src)
    .pipe(watch(path.assets.src))
    .pipe(cache('svg'))
    .pipe(svgmin({
    }))
    //.pipe(new urlencode())
    .pipe(gulp.dest(path.assets.dest))
    .pipe(open({app: 'Sublime Text'}));
});



