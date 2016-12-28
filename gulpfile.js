const gulp =require('gulp');
const babelify=require('babelify');
const browserify=require('browserify');
const source=require('vinyl-source-stream');
const buffer=require('vinyl-buffer');
const uglify = require('gulp-uglify');

gulp.task('sample',()=>{
        browserify('src/js/index.js')
        .transform('babelify',{
            presets:['es2015']
        })
        .bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('dest/js/'));
}); 

gulp.task('default',['sample'],()=>{
    gulp.watch('src/js/*.js',['sample'])
});