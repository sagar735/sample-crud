const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const eslint=require('gulp-eslint');




gulp.task('sample', () => {
    browserify('src/js/index.js')
        .transform(babelify, {
            presets: ['es2015']
        })
        .bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        // .pipe(uglify())
        .pipe(gulp.dest('dest/js/'));
}); 


gulp.task('lint', () => {
    return gulp.src('src/js/*.js')
        .pipe(eslint())
        .pipe(eslint.format());

});
gulp.task('default', ['sample','lint'], () => {
    gulp.watch('src/js/*.js', ['sample','lint']);
});