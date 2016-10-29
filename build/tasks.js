import babel from 'gulp-babel';
import commonjs from 'rollup-plugin-commonjs';
import del from 'del';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import pug from 'gulp-pug';
import rollup from 'rollup-stream';
import sass from 'gulp-sass';
import stream from 'vinyl-source-stream';
import { create } from 'browser-sync';
import { paths } from '../build/paths';

let browserSync = create();


gulp.task( 'clean', () => {
  return del( paths.output );
} );

gulp.task( 'lint', () => {
  return gulp
    .src( [
      ...paths.buildFiles,
      paths.gulpfile,
      paths.sourceFiles
    ] )
    .pipe( eslint() )
    .pipe( eslint.format() )
    .pipe( eslint.failAfterError() );
} );

gulp.task( 'rollup', ['lint'], () => {
  let options = {
    entry: paths.entryFile,
    plugins: [
      json(),
      nodeResolve( { jsnext: true, main: true } ),
      commonjs()
    ]
  };

  return rollup( options )
    .pipe( stream( paths.bundleFile ) )
    .pipe( gulp.dest( paths.output ) )
} );

gulp.task( 'build-js', ['rollup'], () => {
  return gulp.src( paths.outputFiles )
    .pipe( babel() )
    .pipe( gulp.dest( paths.output ) )
    .pipe( browserSync.stream() );
} );

gulp.task( 'build-css', () => {
  return gulp.src( paths.scssFiles )
    .pipe( sass() )
    .pipe( gulp.dest( paths.output ) )
    .pipe( browserSync.stream() );
} );

gulp.task( 'build-html', () => {
  return gulp.src( paths.pugFiles )
    .pipe( pug( { pretty: true } ) )
    .pipe( gulp.dest( paths.output ) )
    .pipe( browserSync.stream() );
} );

gulp.task( 'build-all', ['clean'], () => {
  gulp.start( 'build-css', 'build-html', 'build-js' );
} );

gulp.task( 'serve', ['build-all'], () => {
  browserSync.init( {
    server: {
      baseDir: './dist'
    }
  } );

  gulp.watch( paths.scssFiles, ['build-css'] );
  gulp.watch( paths.pugFiles, ['build-html'] );
  gulp.watch( paths.sourceFiles, ['build-js'] );
} );

gulp.task( 'default', ['serve'] );
