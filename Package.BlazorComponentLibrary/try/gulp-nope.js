

////    return gulp.src('./node_modules/nhsuk-frontend/packages/**/*.scss')
////        .pipe(sass().on('error', sass.logError))
////        .pipe(gulp.dest('./wwwroot/css/nhsuk/'));



//// gulpfile.js

////qqqq refeactor this is just ai generated atm compare to one in mvcblazor project
//const gulp = require('./gulp-nope');
//const sass = require('gulp-sass')(require('sass'));
//const fs = require('fs');
//const path = require('path');

//// Get the package.json to read dependency versions dynamically
//const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
//const telPackageName = 'nhse-tel-frontend';

//// Function to find latest version of a file with a pattern
//function getLatestVersionedFile(dir, pattern) {
//    const files = fs.readdirSync(dir).filter(file => file.match(pattern));
//    return files.sort().pop(); // Simple sorting to get latest version
//}

//// Compile Sass to CSS
//gulp.task('sass', function () {
//    return gulp.src(`./node_modules/${telPackageName}/packages/**/*.scss`)
//        .pipe(sass().on('error', sass.logError))
//        .pipe(gulp.dest('./wwwroot/css/tel/'));
//});

//// Copy JS assets (dynamically finding the file)
//gulp.task('copy-tel-js', function () {
//    const jsDir = `./node_modules/${telPackageName}/dist/`;
//    const jsFile = getLatestVersionedFile(jsDir, /^nhsuk-.*\.min\.js$/);

//    if (!jsFile) {
//        console.error('Could not find TEL JS file');
//        return Promise.resolve();
//    }

//    return gulp.src(path.join(jsDir, jsFile))
//        .pipe(gulp.dest('./wwwroot/js/'))
//        .on('end', () => console.log(`TEL JS copy complete: ${jsFile}`));
//});

//// Copy any other assets if needed
//gulp.task('copy-assets', function () {
//    return gulp.src(`./node_modules/${telPackageName}/assets/**/*`)
//        .pipe(gulp.dest('./wwwroot/assets/'));
//});

//// Watch for changes
//gulp.task('watch', function () {
//    gulp.watch(`./node_modules/${telPackageName}/packages/**/*.scss`, gulp.series('sass'));
//    gulp.watch(`./node_modules/${telPackageName}/dist/*.js`, gulp.series('copy-tel-js'));
//    gulp.watch(`./node_modules/${telPackageName}/assets/**/*`, gulp.series('copy-assets'));
//});

//// Default task
//gulp.task('default', gulp.series('sass', 'copy-tel-js', 'copy-assets', 'watch'));

//// Build task (without watch) for CI/CD pipelines
//gulp.task('build', gulp.series('sass', 'copy-tel-js', 'copy-assets'));



//// gulpfile.js

////const gulp = require('gulp');
////const sass = require('gulp-sass')(require('sass'));

////// Compile Sass to CSS
////gulp.task('sass', function () {

////    return gulp.src('./node_modules/nhsuk-frontend/packages/**/*.scss')
////        .pipe(sass().on('error', sass.logError))
////        .pipe(gulp.dest('./wwwroot/css/nhsuk/'));
////});
////gulp.task('copy-nhsuk-js', function () {
////    return gulp.src('./node_modules/nhsuk-frontend/dist/nhsuk-9.0.1.min.js')
////        .pipe(gulp.dest('./wwwroot/js/'))
////        .on('end', () => console.log('NHS UK JS copy complete.'));  // Adjust destination as needed
////});


////// Watch for changes
////gulp.task('watch', function () {
////    gulp.watch('./node_modules/nhsuk-frontend/packages/**/*.scss', gulp.series('sass')); // Monitor SCSS files in the npm package
////    gulp.watch('./node_modules/nhsuk-frontend/dist/nhsuk-9.0.1.min.js', gulp.series('copy-nhsuk-js')); // Monitor the JS file
////});

////// Default task
////gulp.task('default', gulp.series('sass', 'copy-nhsuk-js', 'watch')); // Run sass, copy js, and watch tasks


//// gulpfile.js

//const gulp = require("gulp");
//const sass = require("gulp-sass")(require("sass"));
//const concat = require("gulp-concat");

//// Compile SCSS
//gulp.task("sass", function () {
//    return gulp
//        .src("./scss/**/*.scss")
//        .pipe(sass().on("error", sass.logError))
//        .pipe(concat("site.css"))
//        .pipe(gulp.dest("wwwroot/css"));
//});

//// Watch files
//gulp.task("watch", function () {
//    gulp.watch("./scss/**/*.scss", gulp.series("sass"));
//});

//// Default task
//gulp.task("default", gulp.series("sass", "watch"));
