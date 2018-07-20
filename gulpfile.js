const gulp = require('gulp');
const plumber = require('gulp-plumber');
const livereload = require('gulp-livereload');
const stylus = require('gulp-stylus');
const pug = require('gulp-pug');
const connect = require('gulp-connect');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

gulp.task('stylus', () => {
  gulp.src('./src/evn/stylus/home.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('./public/css/evn/'))
    .pipe(livereload());
});

gulp.task('pug', function(){
 gulp.src(['./src/evn/pug/post/**/*.pug'], ['./src/evn/pug/index.pug'],)
	.pipe(plumber())
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest('./evn/post/'))
	.pipe(livereload());
});

gulp.task('html', function () {
  gulp.src(['./*.html'], ['./freider/post/*.html'], ['./oromion/post/*.html'], ['./debian-4ever/post/*.html'])
    .pipe(gulp.dest('./'))
    .pipe(livereload());
});


gulp.task('watch', function(){
  livereload.listen();
  gulp.watch('./src/evn/stylus/*.styl', ['stylus']);
  gulp.watch(['./src/evn/pug/post/**/*.pug', './src/evn/pug/post/index.pug'], ['pug']);
  gulp.watch('./*.html', ['html']);
  gulp.watch('./prueba/*.html', ['html']);
});



gulp.task('connect', function() {
  connect.server({
      root:['./'],
      port: 3000,
      livereload: true
  })
});

gulp.task('default', [
  'stylus',
  'pug',
  'watch',
  'connect'
])
