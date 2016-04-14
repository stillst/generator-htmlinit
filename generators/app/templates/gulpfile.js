var gulp = require('gulp'),
    connect = require('gulp-connect'),
    opn = require('opn'),
    wiredep = require('wiredep').stream,
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    notify = require('gulp-notify'),
    spritesmith = require('gulp.spritesmith'),
    rename = require("gulp-rename"),

    //Перебираемся на PostCSS
    postcss = require('gulp-postcss'),
    stylelint = require('stylelint'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnano = require('cssnano'),
    autoprefixer = require('autoprefixer'),
    fileinclude = require('gulp-file-include'),
    //gulpStylelint = require('gulp-stylelint'),
    //stylelint   = require('stylelint'),
    precss = require('precss');


// Очистка папки DIST
gulp.task('clean', function () {
    return gulp.src('dist/', {read: false})
        .pipe(clean())
        .pipe(notify('dist cleaned'));
});

// Копирование статики
gulp.task('copy_img', function () {
    return gulp.src('src/img/**/*')
     .pipe(gulp.dest('dist/img/'));
});


gulp.task('copy_fonts', function () {
    return gulp.src('src/bower/Font-Awesome/fonts/*')
     .pipe(gulp.dest('dist/fonts/'));
});


// Склейка, минификация для js и css. А также изменение путей до css* и js* и копирирование их в dist
gulp.task('dist', function () {
    var assets = useref.assets();
    return gulp.src('src/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'))
        .pipe(notify({message: 'Сборка завершена', onLast: true}));
});

// Bower
gulp.task('bower', function () {
    gulp.src('src/*.html')
        .pipe(wiredep({
            directory: 'src/bower'
        }))
        .pipe(gulp.dest('src'));
});

// Запуск сервера
gulp.task('connect', function() {
    connect.server({
        root: 'src',
        livereload: true
    });
    opn('http://localhost:8080')
});

// Запуск сервера
gulp.task('connect-dist', function() {
    connect.server({
        root: 'dist'
    });
    opn('http://localhost:8080');
});

// Работа с HTML
gulp.task('html_compile', function() {
  gulp.src('src/html/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./src/'));
});


gulp.task('html', function () {
    gulp.src('./src/*.html')
    .pipe(notify({message: 'HTML изменён', onLast: true}))
    .pipe(connect.reload());
});

// Работа с CSS
gulp.task('css', function () {
    gulp.src('./src/css/*.css')
    .pipe(connect.reload())
    .pipe(notify({message: 'CSS создан', onLast: true}));
});

// Работа с JS
gulp.task('js', function () {
    gulp.src('./src/js/*.js')
    .pipe(notify({message: 'HTML изменён', onLast: true}))
    .pipe(connect.reload());
});



// var stylelintConfig = {
//     "rules": {
//       "block-no-empty": true,
//       "color-no-invalid-hex": true,
//       "declaration-colon-space-after": "always",
//       "declaration-colon-space-before": "never",
//       "function-comma-space-after": "always",
//       "function-url-quotes": "double",
//       "media-feature-colon-space-after": "always",
//       "media-feature-colon-space-before": "never",
//       "media-feature-name-no-vendor-prefix": true,
//       "max-empty-lines": 5,
//       "number-leading-zero": "never",
//       "number-no-trailing-zeros": true,
//       "property-no-vendor-prefix": true,
//       "rule-no-duplicate-properties": true,
//       "declaration-block-no-single-line": true,
//       "rule-trailing-semicolon": "always",
//       "selector-list-comma-space-before": "never",
//       "selector-list-comma-newline-after": "always",
//       "selector-no-id": true,
//       "string-quotes": "double",
//       "value-no-vendor-prefix": true
//     }
//   }


// Компиляция CSS
gulp.task('css_compile', function () {
    var processors = [
        precss(),
        cssnano({discardComments: {removeAll: true}}),
        autoprefixer({browsers: ['> 5%']}),
        //stylelint(stylelintConfig),
    ];
    return gulp.src('src/css/import.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(rename("style.css"))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('src/css/'));
});


// Слежка
gulp.task('watch', function () {
    gulp.watch(['./src/html/**/*.html'], ['html_compile']); //собираем html если какой-то из шаблонов html изменился
    gulp.watch(['./src/*.html'], ['html']); //перезапускаем сервер если html пересобрался
    gulp.watch(['./src/js/*.js'], ['js']); //перезапускаем сервер если javascript файлы изменились
    gulp.watch(['./src/css/modules/**/*.css'], ['css_compile']);//собираем style.css если какой-то из шаблонов css изменился
    gulp.watch(['./src/css/style.css'], ['css']); //перезапускаем сервер если style.css пересобрался
});


// Спрайты
gulp.task('sprite', function() {
    var spriteData =
        gulp.src('./src/img/_for_sprite/**/*.png') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.less',
                cssFormat :'less',
                padding: 10,
            }));
    //../img/sprite/sprite.png
    spriteData.img.pipe(gulp.dest('./src/img/sprite/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('./src/less/base/')); // путь, куда сохраняем стили
});


// Задача по-умолчанию
gulp.task('default', ['connect', 'watch']);

// Сборка проекта
gulp.task('compile', ['dist', 'copy_img', 'copy_fonts']);


//Компиляция LESS
// gulp.task('less', function () {
//     return  gulp.src('src/less/style.less')
//     .pipe(less())
//     .pipe(gulp.dest('src/css'));
// });
//less = require('gulp-less'),
//minifyCss = require('gulp-minify-css'),