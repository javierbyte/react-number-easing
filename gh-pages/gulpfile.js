const gulp = require('gulp');

const assign = require('lodash.assign');
const babelify = require('babelify');
const browserify = require('browserify');
const gutil = require('gulp-util');
const less = require('gulp-less');
const livereload = require('gulp-livereload');
const source = require('vinyl-source-stream');
const watchify = require('watchify');

// add custom browserify options here
const customOpts = {
	entries: ['./src/js/app.jsx'],
	debug: true,
};
const opts = assign({}, watchify.args, customOpts);
const b = watchify(browserify(opts)
	.transform(babelify));

gulp.task('js', bundle); // so you can run `gulp js` to build the file

gulp.task('less', () => gulp.src('./src/styles/main.less')
	.pipe(less())
	.on('error', function (err) {
		console.log('LESS ERROR', err);
		this.emit('end');
	})
	.pipe(gulp.dest('./dist'))
	.pipe(livereload()));

gulp.task('lessWatch', () => {
	livereload.listen();
	gulp.watch('src/styles/**/*.less', ['less']);
});

gulp.task('default', ['js', 'lessWatch']);

b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
	return b.bundle()
		// log errors if they happen
		.on('error', function (err) {
			console.log('\n');
			gutil.log(gutil.colors.yellow('BROWSERIFY ERROR'));

			if (err.filename) {
				const path = err.filename.split('\\');
				let errLoc = '';
				if ('loc' in err) {
					errLoc = ` (${err.loc.line}:${err.loc.column})`;
				}

				path.splice(0, 3);

				gutil.log(gutil.colors.yellow('File:', path.join('/') + errLoc));
				if ('codeFrame' in err) {
					gutil.log(gutil.colors.yellow('Error:\n', err.codeFrame));
				}
				this.emit('end');
			} else {
				gutil.log(err);
			}
		})

		.pipe(source('app.js'))

		.pipe(gulp.dest('./dist'))
		.pipe(livereload());
}
