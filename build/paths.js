let source = 'src/';
let output = 'dist/';

let paths = {
  buildFiles: ['build/paths.js', 'build/tasks.js'],
  bundleFile: 'scripts.js',
  entryFile: `${ source }app.js`,
  gulpfile: 'gulpfile.babel.js',
  output,
  outputFiles: `${ output }**/*.js`,
  pugFiles: `${ source }**/*.pug`,
  scssFiles: `${ source }**/*.scss`,
  sourceFiles: `${ source }**/*.js`
};

export { paths };
