const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const ts = require('gulp-typescript');
const browserSync = require('browser-sync').create();

function compileSass(){
    return src('sass/main.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest('dist/css'));
}

function liveReload(){
    return src('dist/*.html')
    .pipe(browserSync.stream());
}
function watchHtml(){
    return src('*.html')
    .pipe(dest('dist'));
}

function compileTypescript(){
    return src('ts/**/*.ts')
    .pipe(ts({
        noImplicitAny: true,
        outFile: 'main.js'
    }))
    .pipe(dest('dist/js'));
}

exports.default = function(){
    //compile and watch
    watch('sass/*.scss',compileSass);
    watch('*.html',watchHtml);
    watch('ts/*.ts',compileTypescript);
    watch('dist/*.html',liveReload);
};