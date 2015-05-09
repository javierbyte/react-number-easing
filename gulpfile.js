'use strict';

var gulp = require('gulp');

var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var assign = require('lodash.assign');
var babelify = require('babelify');
var livereload = require('gulp-livereload');
var less = require('gulp-less');

// add custom browserify options here
var customOpts = {
    entries: ['./src/js/app.jsx'],
    debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts).transform(babelify.configure({
    stage: 1
})));

gulp.task('js', bundle); // so you can run `gulp js` to build the file

gulp.task('less', function() {
    return gulp.src('./src/styles/main.less')
        .pipe(less())
        .on('error', function(err) {
            console.log('LESS ERROR', err);
            this.emit('end');
        })
        .pipe(gulp.dest('./dist'))
        .pipe(livereload());
});

gulp.task('lessWatch', function() {
    livereload.listen();
    gulp.watch('src/styles/**/*.less', ['less']);
});

gulp.task('default', ['js', 'lessWatch']);

b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
    return b.bundle()
        // log errors if they happen
        .on('error', function(err) {
            console.log('\n');
            gutil.log(gutil.colors.yellow('BROWSERIFY ERROR'));

            if (err.filename) {
                var path = err.filename.split('/');
                path.splice(0, 3);

                gutil.log(
                    gutil.colors.yellow('File:', path.join('/'))
                );
                gutil.log(gutil.colors.yellow('Line:', err.loc.line));
                gutil.log(gutil.colors.yellow('Column:', err.loc.column));
                this.emit('end');
            } else {
                gutil.log(err);
            }
        })

    .pipe(source('app.js'))

    .pipe(gulp.dest('./dist'))
        .pipe(livereload());
}
