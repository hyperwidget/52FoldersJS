"use strict";

var gulp = require("gulp");
var concat = require("gulp-concat");

gulp.task("concat", function () {
    return gulp.src([
            'src/constants.js',
            'src/api.js',
            'src/post.js',
            'src/user.js',
            'src/*.js'
        ])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', ['concat'], function () {
    gulp.watch('src/**/**.js', ['concat']);
});

gulp.task('default', ['concat']);