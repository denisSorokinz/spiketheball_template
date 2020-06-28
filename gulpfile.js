const gulp = require('gulp'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      concat = require('gulp-concat'),
      cleancss = require('gulp-clean-css'),
      minify = require('gulp-minify'),
      pug = require('gulp-pug');
gulp.task('init-bootstrap--css', () => {
    return gulp.src('./node_modules/bootstrap/scss/*.scss')
                .pipe(sass().on('error', sass.logError))
                .pipe(gulp.dest('./assets/bootstrap/'));
});
gulp.task('concat-scripts', () => {
    return gulp.src(
        ['./node_modules/jquery/dist/jquery.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/slick-carousel/slick/slick.min.js',
        './assets/scripts/custom.js'
        ])
        .pipe(concat('scripts.js'))
        .pipe(minify())
        .pipe(gulp.dest('./assets/scripts/min/'));
});
gulp.task('init-slickslider', () => {
    return gulp.src('./node_modules/slick-carousel/slick/slick.css')
                .pipe(gulp.dest('./assets/slick/'));
});
gulp.task('transpile-styles', () => {
    return gulp.src(['./assets/styles/custom.sass', './assets/bootstrap/bootstrap.css', './assets/slick/slick.css', './assets/styles/reset.css'])
                .pipe(sourcemaps.init())
                .pipe(sass().on('error', sass.logError))
                .pipe(concat('styles.min.css'))
                .pipe(cleancss())
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest('./assets/styles/'));
});
gulp.task('transpile-pug', () => {
    return gulp.src('./index.pug')
                .pipe(pug({
                    doctype: 'html',
                    pretty: true
                }))
                .pipe(gulp.dest('./'));
});
gulp.task('transpile', gulp.series('init-bootstrap--css', 'init-slickslider', 'transpile-styles', 'concat-scripts'));
gulp.task('watch', () => {
    gulp.watch(['./assets/styles/custom.sass', './assets/styles/reset.css'], gulp.series('transpile-styles'));
    gulp.watch('./index.pug', gulp.series('transpile-pug'));
    gulp.watch('./assets/scripts/custom.js', gulp.series('concat-scripts'));
});