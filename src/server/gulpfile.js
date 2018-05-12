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

gulp.task('server-clean', done => {
  rimraf(`${serverBuildPath}/**/*`, (err) => done(err));
})

gulp.task('server-build-dev-only', () => {
  return buildSource(true);
})

gulp.task('server-build-prod-only', () => {
  return buildSource(false);
})

gulp.task('server-build-dev', gulp.series('server-clean', 'server-build-dev-only'));

gulp.task('server-build-production', gulp.series('server-clean', 'server-build-prod-only'));




function buildSource(devMode) {
  // Build source.
  let out = gulp.src(path.resolve(__dirname, './**/*.ts'));
  if (devMode) {
    out = out.pipe(sourcemaps.init())
  }

  out = out.pipe(project());
  if (devMode) {
    out = out.js.pipe(sourcemaps.write(null, {
      includeContent: false,
      mapSources: (path, file) => {
        // gulp-sourcemaps is stupid, I think because I am including files from two distinct paths?
        let slashCnt = file.relative.split('\\').length - 1;
        return '../'.repeat(slashCnt) + path.substring(6);
      }
    }));
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