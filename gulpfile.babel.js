import gulp    from 'gulp';
import babel   from 'gulp-babel';
import eslint  from 'gulp-eslint';
import plumber from 'gulp-plumber';

let  src_path = `./src/**/*.js`;

gulp.task(`lint`, () => {
  return gulp.src([`./gulpfile.babel.js`, src_path])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task(`build`, () => {
  return gulp.src(src_path)
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest(`./bin`));
});

gulp.task(`watch`, () => {
  return gulp.watch(src_path, [`lint`, `build`]);
});

gulp.task(`default`, [`lint`, `build`, `watch`]);
