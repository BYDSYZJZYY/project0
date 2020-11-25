var gulp = require('gulp');//скачать gulp через npm install --save-dev gulp
var rename = require('gulp-rename');//скачать gulp-rename через npm install --save-dev gulp-rename (чтобы переименовывать)
var sass = require('gulp-sass');//скачать gulp-sass через npm install --save-dev gulp-sass (чтобы конвертировать scss в css)
var autoprefixer = require('gulp-autoprefixer');//скачать gulp-autoprefixer через npm install --save-dev gulp-autoprefixer (чтобы верстать на все браузеры moz webkit ....)
var sourcemaps = require('gulp-sourcemaps');//скачать gulp-sourcemaps через npm install --save-dev gulp-sourcemaps(чтобы отслеживать коренную папку)
var browserSync = require('browser-sync').create();//скачать browser-sync через npm install --save-dev browser-sync (автоматически обновляет страницу )

function copyStyles(file) {
    gulp.src('./scss/**/*.scss')  //работать с этим файлом (пикает этот файл для дальнейшей работы )
        .pipe(sourcemaps.init())//начать отслеживание
        .pipe(sass({
            errLogToConsole:true,//выводить ошибки в консоли/терминале
            outputStyle:'compressed'//комрессовать в cssе (без отступов, пробелов)
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
            // Browserslist:['last 2 versions'],//для 2 последних версий сайта, не забудь поправить package.json (погугли) 
            cascade: false
        }))
        .pipe(rename({suffix:'.min'}))//довлять суффикс .min
        .pipe(sourcemaps.write())//закончить отслеживание
        .pipe(gulp.dest('./css/'))//переправить переделанный файл в папку css с тем же именем что и там
        .pipe(browserSync.stream());//автоматом обновить страницу 
        console.log('JI');
        file();
}
function sync(done) {//для своего сервака 
    browserSync.init({
        server:{
            baseDir:'./'
        },
        port:3000
    });
    done();
}
function browserReload(params) {//сразу выводит изменения в браузере
    browserSync.reload();
    params();
}

function watchFiles() {//важная штука
    gulp.watch("./scss/**/*.scss", copyStyles);
    gulp.watch("./**/*.html", browserReload);
    gulp.watch("./**/*.js", browserReload);
    gulp.watch("./**/*.php", browserReload);

}
gulp.task('default', gulp.parallel(watchFiles, sync));//таскает (бен нее никак)
// gulp.task(copyStyles);