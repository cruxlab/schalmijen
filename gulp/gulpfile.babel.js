/**
 * Created by cleuzinger on 27.06.2016.
 */
'use strict';

import gulp from 'gulp';
import Config from './gulp.config';
import babel from 'gulp-babel';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import concat from 'gulp-concat';
import del from 'del';
import eslint from 'gulp-eslint';
import gutil from 'gulp-util';
import rename from 'gulp-rename';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import through from 'through2';
import uglify from 'gulp-uglify';

let config = new Config();

function logFileHelpers() {
    return through.obj((file, enc, cb) => {
        console.log(file.babel.usedHelpers);
        cb(null, file);
    });
}

gulp.task('hello', function(){
    console.log("gulp says hello");
    console.log(config.source);
});

gulp.task('lint', function(){
    return gulp.src(config.source)
        .pipe(eslint({
            configFile: '.eslintrc'
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('clean-build', function(){
    return del([config.build + '**/*'], {force:true});
});

gulp.task('clean-debug', function(){
    return del([config.debug + '**/*'], {force:true});
});

gulp.task('clean-temp', function(){
    return del([config.temp + '**/*'], {force:true});
});

gulp.task('babelify', ['lint'], function(){
   return gulp.src(config.source)
       .pipe(babel({presets:['es2015']}))
       //.pipe(logFileHelpers())
       .pipe(gulp.dest(config.temp));
});

gulp.task('release', ['babelify'], function(){
    return browserify({
        entries: config.temp + 'public/connection.js',
        standalone: 'DPB.Client',
        debug: true
    })
        .bundle()
        .pipe(source('collab-jsclient.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(rename('collab-jsclient.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.build));
});

gulp.task('build', ['clean-build', 'clean-temp', 'release'], function(){
    return del([config.temp + '**/*'], {force:true});
});

gulp.task('snapshot', ['babelify'], function(){
    return browserify({
        entries: config.temp + 'public/connection.js',
        standalone: 'DPB.Client',
        debug: true
    })
        .bundle()
        .pipe(source('debug-jsclient.js'))
        .pipe(buffer())
        .on('error', gutil.log)
        .pipe(rename('debug-jsclient.js'))
        .pipe(gulp.dest(config.debug));
});

gulp.task('debug', ['clean-debug', 'clean-temp', 'snapshot'], function(){
    return del([config.temp + '**/*'], {force:true});
});