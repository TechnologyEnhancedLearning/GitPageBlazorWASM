// gulpfile.js

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");

// Compile SCSS to CSS
gulp.task("sass", function () {
    return gulp
        .src("./scss/**/*.scss")  // Adjust this path if needed
        .pipe(sass().on("error", sass.logError))
        .pipe(concat("site.css"))
        .pipe(gulp.dest("wwwroot/css"));
});

// Copy Bootstrap CSS from node_modules
//     .src("node_modules/bootstrap/dist/css/bootstrap.min.css")
//.src("node_modules/nhsuk-frontend/dist/nhsuk-9.0.1.min.css") //if providing the css too 
gulp.task("copy-nhsuk-css", function () {
    return gulp
        .src("node_modules/nhse-tel-frontend/dist/nhsuk.css")
        .pipe(gulp.dest("wwwroot/css"));
});

// Watch for changes
gulp.task("watch", function () {
    gulp.watch("./scss/**/*.scss", gulp.series("sass"));
});
//,"watch"
// Default task
gulp.task("default", gulp.series("copy-nhsuk-css", "sass"));