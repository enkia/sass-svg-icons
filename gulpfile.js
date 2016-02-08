// load gulp dependancies
var gulp = require('gulp');
    gutil = require('gulp-util');
    cache = require('gulp-cached');
    imagemin = require('gulp-imagemin');
    sass = require('gulp-sass');
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
gulp.task('svg', ['build-svg']);

// watch for events
gulp.task('watch', function () {
    gulp.watch(path.assets.svg, ['build-svg']);
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
    .pipe(open({app: 'Sublime Text'}))
    .pipe(gulp.dest(path.assets.dest));
});



