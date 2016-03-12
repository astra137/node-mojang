import gulp from 'gulp';
const master = [];

import babel from 'gulp-babel';
import del from 'del';
gulp.task('clean:javascript', () => del(['out/**.js']));
gulp.task('build:javascript', ['clean:javascript'], () =>
  gulp.src('src/**.js', { base: 'src' })
    .pipe(babel())
    .pipe(gulp.dest('lib'))
);
master.push('clean:javascript', 'build:javascript');

import eslint from 'gulp-eslint';
gulp.task('lint:javascript', () =>
  gulp.src('src/**.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);
master.push('lint:javascript');


gulp.task('default', master);
