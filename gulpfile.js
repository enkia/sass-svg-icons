// load gulp dependancies
var gulp = require('gulp');
    gutil = require('gulp-util');
    batch = require('gulp-batch');
    cache = require('gulp-cached');
    imagemin = require('gulp-imagemin');
    watch = require('gulp-watch');
    open = require('gulp-open');

// path variables
path = {
    assets: {
        src: './source/assets/svg/*.svg',
        dest: './source/assets/svg/processed'
    }
};

// default and build tasks
gulp.task('default', ['watch']);
gulp.task('svg', ['build-svg']);

// watch for events
/*gulp.task('watch', function () {
    gulp.watch(path.assets.src, ['build-svg']);
});*/

gulp.task('watch', function () {
    watch(path.assets.src, batch(function (events, done) {
        gulp.start('build-svg', done);
    }));
});


// optimize svg and open in editor
gulp.task('build-svg', function() {
    return gulp.src(path.assets.src)
    .pipe(watch(path.assets.src))
    .pipe(cache('svg'))
    .pipe(imagemin({
        optimizationLevel: 5,
        svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest(path.assets.dest))
    .pipe(open({app: 'Sublime Text'}));
});



