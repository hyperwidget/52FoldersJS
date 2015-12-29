"use strict";

import gulp from "gulp";
import sass from "gulp-sass";
import browserify from "browserify";
import source from "vinyl-source-stream";

gulp.task("transpile", ()=> {
    return browserify('src/app.js')
        .transform('babelify')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
    gulp.src('./assets/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./assets/'));
});

gulp.task('watch', ['transpile', 'sass'], ()=> {
    gulp.watch('src/**/**.js', ['transpile']);
    gulp.watch('src/assets/**/*.scss', ['sass']);
});

gulp.task('default', ['transpile', 'sass']);