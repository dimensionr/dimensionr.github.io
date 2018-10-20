import {src, dest, watch, parallel, series} from 'gulp';
import browserify from "browserify";
import server from 'browser-sync';
import source from "vinyl-source-stream";
import stylus from "gulp-stylus"
import pug from "gulp-pug"
import plumber from "gulp-plumber"
import path from "path"

let resolve = (...paths) => path.join(__dirname, ...paths)

/* Directories and Paths */
let dirs = {
  src : resolve("src"),
  css : resolve("public/css"),
  js : resolve("public/js"),
  public : resolve("public/"),
  root : resolve("/")
}

let paths = {
  js : "",
  css : "",
  pug : {
    entry : [dirs.src + "/pug/index.pug", dirs.src + "/pug/**/*.pug", "!" + dirs.src + "/pug/layout.pug", "!" + dirs.src + "/pug/partials/*.pug"],
    all : dirs.src + "/pug/**/*.pug"
  },
  stylus : {
    entry : dirs.src + "/stylus/themes/**/*.theme.styl",
    all : dirs.src + "/stylus/**/*.styl"
  },
  static: {
    entry: dirs.src + '/**/assets/**' ,
    all: dirs.src + '/**/assets/**'
  }
}

/* stylus */
export let css = done => src(paths.stylus.entry)
.pipe(plumber())
  .pipe(stylus())
  .pipe(dest(dirs.css))
  .pipe(server.stream())

/* pug */
export let html = done => src(paths.pug.entry)
  .pipe(plumber())
  .pipe(pug({
    pretty: true,
    basedir: __dirname + '/src/pug'
  }))
  .pipe(dest(dirs.root))
  .pipe(server.stream())

/* static */
export let assets = done => src(paths.static.entry, {base: dirs.src})
  .pipe(dest(dirs.public))
  .pipe(server.stream())


/* watch */
export let watching = done => {
  watch(paths.stylus.all, css)
  watch(paths.pug.all, html)
  watch(paths.static.all, assets).on('change', server.reload)
  done()
}


// gulp.task('serve', ['watch'], () => {
//   browserSync({
//     notify: false,
//     open:false,
//     port: 3000,
//     server: {
//       baseDir: '.'
//     }
//   });
//
//   gulp.watch([
//     '**/*.html',
//     'assets/**/*.css',
//     'assets/**/*.js'
//   ]).on('change', browserSync.reload);
// });

export let serve = done => {
  server.init({
    server: {
      baseDir: dirs.root
    },
    open: false,
    tunnel: false,
    notify: false
  })
  done()
}

export const dev = series(css, html, assets, serve, watching)

export default dev;
