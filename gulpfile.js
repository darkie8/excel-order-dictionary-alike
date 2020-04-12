const gulp = require('gulp');
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
var concat = require('gulp-concat');
gulp.task('minify-js', () => {
    return gulp.src(['index.js'])
    // .pipe(babel({presets: ['@babel/env']}))
    .pipe(concat('index.js'))
    .pipe(composer(uglifyes, console)())
    .pipe(gulp.dest('./'));
});