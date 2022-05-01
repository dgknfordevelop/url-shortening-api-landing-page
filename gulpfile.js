const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');

function minifyHTML() {
    return gulp.src('./src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./dist'))
}

function minifyJS(){
    return gulp.src('./src/*.js')
    .pipe(terser())
    .pipe(gulp.dest('./dist'))
}

function minifyIMG(){
    return gulp.src('./src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

    gulp.watch('./src/*.html').on('change', browserSync.reload);
    gulp.watch('./src/*.js').on('change', browserSync.reload);
    gulp.watch('./src/*.html', minifyHTML);
    gulp.watch('./src/*.js', minifyJS);
    gulp.watch('.src/img/*', minifyIMG);
}

function defaultTask() {
    browserSync.reload
    minifyHTML();
    minifyJS();
    minifyIMG();
    watch();
}


exports.default = defaultTask;