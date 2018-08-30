const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const envify = require('gulp-envify');
const uglify = require('gulp-uglify-es').default;
const nodemon = require('gulp-nodemon');
const path = require('path');
const rimraf = require('rimraf');

const project = ts.createProject(path.join(__dirname, 'tsconfig.json'));

const serverBuildPath = path.resolve(__dirname, '../', '../', 'dist', 'server');

gulp.task('server-clean', done => rimraf(`${serverBuildPath}/**/*`, (err) => done(err)));

gulp.task('server-build-development', (done) => buildSource(true).end(done));

gulp.task('server-build-production', (done) => buildSource(false).end(done));

gulp.task('server-production', gulp.series('server-clean', 'server-build-production'));

gulp.task('server-development-clean-and-build', gulp.series('server-clean', 'server-build-development'));

gulp.task('server-development-nodemon', done => {
  nodemon({
    execMap: {
      js: 'node --inspect'
    },
    script: path.join(serverBuildPath, 'server.js'),
    watch: [__dirname],
    ext: 'ts json',
    tasks: ['server-development-clean-and-build'],
    env: { 'NODE_ENV': process.env.NODE_ENV || 'development' }
  });
  done();
})

gulp.task('server-development', gulp.series('server-development-clean-and-build', 'server-development-nodemon'));

function buildSource(devMode) {
  // Build source.
  let out = gulp.src(path.resolve(__dirname, './**/*.ts'));
  if (devMode) {
    out = out.pipe(sourcemaps.init())
  }

  out = out.pipe(project());
  if (devMode) {
    out = out.js.pipe(sourcemaps.mapSources((path, file) => {
      let slashCnt = file.sourceMap.file.split('/').length - 1;
      return '../'.repeat(slashCnt) + path;
    }))
      .pipe(sourcemaps.write('./'));
  }

  out.pipe(envify({ BUILD_FLAG: devMode ? 'development' : 'production' }));

  if (!devMode) {
    out = out.pipe(uglify()).on('error', err => {
      console.log('Failed to uglify...')
      console.log(err.toString());
    });
  }
  return out.pipe(gulp.dest(serverBuildPath));
}