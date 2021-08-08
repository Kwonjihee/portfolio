var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');
//css
var sass = require('gulp-sass')(require('node-sass')),
    minificss = require('gulp-minify-css');
//server
var connect = require('gulp-connect');
//image
var imagemin = require('gulp-imagemin'),
    changed = require('gulp-changed');
var del = require('del');



var devSrc = 'dev';
var etcSrc = 'etc';
var distSrc = 'dist';
var paths = {
    "dev" : {
        "js" : devSrc + '/components/**/devjs/*.js',
        "css" : devSrc + '/components/**/scss/*.scss',
        "cssInner" : devSrc + '/components/**/scss/partials/*.scss',
        "img" : devSrc + '/imgs/*+(png|jpg|gif)',
        "html" : devSrc + '/*.html'
    },
    "etc" : {
        "js" : etcSrc + '/devjs/*.js',
        "css" : etcSrc + '/scss/*.scss',
        "font" : etcSrc + '/fonts/*.*',
    },
    "dist" : {
        "js" : distSrc+'/js',
        "css" : distSrc + '/css',
        "img" : distSrc + '/imgs',
        "html" : distSrc + '/',
        "font" : distSrc + '/fonts',
    }
};

gulp.task('js', async function(){
    gulp.src(paths.dev.js)  //개발코드 위치
        // .pipe(uglify()) //코드 압축
        .pipe(concat('main.js')) //main.js에 모든 js를 합친다.
        .pipe(gulp.dest(paths.dist.js)); //배포 저장 위치 지정
    gulp.src(paths.etc.js)
        .pipe(uglify())
        .pipe(concat('common.js'))
        .pipe(gulp.dest(paths.dist.js));
});

gulp.task('css', async function(){
    gulp.src(paths.dev.css) //개발코드 위치
        .pipe(sass().on('error', sass.logError)) //scss 컴파일하며 오류로그는 나오게한다.
        .pipe(minificss()) //코드 압축
        .pipe(concat('main.css')) //main.css에 모든 css를 합친다.
        .pipe(gulp.dest(paths.dist.css)); //배포 저장 위치 지정
    gulp.src(paths.etc.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(minificss())
        .pipe(gulp.dest(paths.dist.css));
});

gulp.task('html', async function(){
    gulp.src(paths.dev.html) //개발코드 위치
        .pipe(gulp.dest(paths.dist.html)) //복사해서 이동시킴
        .pipe(connect.reload()); //변경되면 실시간 새로고침
});

gulp.task('imgmin', async function(){
    gulp.src(paths.dev.img) //개발용 이미지 위치
        .pipe(changed(paths.dist.img)) //변경 파일 감지
        .pipe(imagemin()) //이미지 압축
        .pipe(gulp.dest(paths.dist.img)); //배포 저장 위치 지정
});

gulp.task('fonts', async function(){
    gulp.src(paths.etc.font)
        .pipe(gulp.dest(paths.dist.font));
});

gulp.task('clean', async function(){
    del([distSrc + '/*']);
})

gulp.task('connect', async function(){
    connect.server({
        root : distSrc,
        livereload : true,
        port : 8001
    });
});

gulp.task('watch', async function(){
    gulp.watch([paths.dev.js, paths.etc.js], gulp.parallel(['js']));
    gulp.watch([paths.dev.css, paths.dev.cssInner], gulp.parallel(['css']));
    gulp.watch(paths.dev.html, gulp.parallel(['html']));
    gulp.watch(paths.dev.img, gulp.parallel(['imgmin']));
    gulp.watch(paths.etc.font, gulp.parallel(['fonts']));
});

gulp.task('default', gulp.parallel('connect', 'js', 'css', 'html', 'imgmin', 'fonts', 'watch'));
gulp.task('dev', gulp.parallel(['clean', 'connect', 'js', 'css', 'html', 'imgmin', 'fonts', 'watch']));