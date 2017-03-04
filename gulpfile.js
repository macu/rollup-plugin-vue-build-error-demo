var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var rollup = require('gulp-rollup');
var buble = require('rollup-plugin-buble');
var vue = require('rollup-plugin-vue');
var scss = require('rollup-plugin-scss');
var uglify = require('rollup-plugin-uglify');
var rename = require('gulp-rename');

var caches = {};
gulp.task('vueify', function() {
	return gulp.src('./src/**/*.{js,scss,vue}')
		.pipe(sourcemaps.init())
		.pipe(rollup({
			// https://www.npmjs.com/package/gulp-rollup#options
			entry: './src/app.js',
			impliedExtensions: ['.js', '.vue'],
			allowRealFiles: true,
			moduleName: 'app',
			separateCaches: caches,
			format: 'iife',
			plugins: [
				vue({
					// http://rollup-plugin-vue.znck.me/configuration/
					compileTemplate: true,
					styleToImports: true,
					cssModules: {
						// scoped CSS not working yet:
						// https://github.com/vuejs/rollup-plugin-vue/issues/62
						generateScopedName: '[name]__[hash:base64:5]',
					},
				}),
				scss({
					output: './css/compiled.css',
					outputStyle: 'compressed',
				}),
				buble(),
				uglify(),
			],
		}))
		.on('bundle', function(bundle, name) {
			caches[name] = bundle;
		})
		.on('error', function(e) {
			console.error(e);
		})
		.pipe(rename('compiled.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./js'));
});

gulp.task('vueify:watch', ['vueify'], function() {
	gulp.watch('./src/*', ['vueify']);
});

gulp.task('default', ['vueify:watch']);
