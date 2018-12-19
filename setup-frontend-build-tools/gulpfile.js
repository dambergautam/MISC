// Require plugins
const gulp = require('gulp');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const postcssScss = require('postcss-scss');
const postcssReporter = require('postcss-reporter');
const stylelint = require('stylelint');
const plugins = require('gulp-load-plugins')();
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');

// Define variables
const config = {
    jsResourcePattern: 'resources/assets/js/**/*.js',
};

// Loading default tasks
gulp.task('default',
    [
        'bundle-core-js',
        'bundle-core-css',
        'eslint',
        'generate-css',
        'watch',
    ]);

// Create gulp task to concate given javascript files and output in public/js dir
gulp.task('bundle-core-js', () => {
    const modulesJS = [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
        'node_modules/admin-lte/dist/js/app.min.js',
        'node_modules/vue/dist/vue.js',
        // 'resources/assets/library/chart_bundle.js',
        'node_modules/vue-chartjs/dist/vue-chartjs.full.js',
    ];
    return gulp.src(modulesJS)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/js'));
});

// Create gulp task to concate given javascript files and output in public/js dir
gulp.task('bundle-core-css', () => {
    const modulesCSS = [
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/admin-lte/dist/css/AdminLTE.min.css',
        'node_modules/admin-lte/dist/css/skins/skin-blue.min.css',
        'node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css',
    ];
    return gulp.src(modulesCSS)
        .pipe(concat('app.css'))
        .pipe(gulp.dest('public/css'));
});

// Create gulp task to strict coding standard and compile browser compatible
// JavaScript and output in specified dir
gulp.task('eslint', () => {
    gulp.src(config.jsResourcePattern)
        .pipe(eslint())
        .pipe(eslint.format())
        // .pipe(eslint.failAfterError())
        .pipe(babel())
        .pipe(gulp.dest('./public/js'));
});

// Compile scss to css
gulp.task('generate-css', ['lint-styles'], () => {
    gulp.src('./resources/assets/sass/**/*.scss')
        .pipe(plugins.sass({
            outputStyle: 'compressed',
        }).on('error', plugins.sass.logError))
        .pipe(plugins.postcss([
            autoprefixer({
                browsers: [
                    'ie > 8', 'last 2 versions',
                ],
            }),
        ]))
        .pipe(rename('custom.style.css'))
        .pipe(gulp.dest('./public/css'));
});

// Style lint checker
gulp.task('lint-styles', () =>
    gulp.src('./resources/assets/sass/**/*.scss')
        .pipe(plugins.postcss([
            stylelint(),
            postcssReporter(
                {
                    clearMessages: true,
                })],
        {
            syntax: postcssScss,
        })));

// Create gulp watch task
gulp.task('watch', () => {
    gulp.watch(config.jsResourcePattern, ['eslint']);
});
