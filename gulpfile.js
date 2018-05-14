const gulp = require('gulp');
require('./src/client/gulpfile.js');
require('./src/server/gulpfile.js');

gulp.task('build-production', gulp.parallel('client-production', 'server-production'));

gulp.task('build-development', gulp.parallel('client-development', 'server-development'));