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
gulp.task("bootstrap", function () {
    return gulp
        .src("node_modules/bootstrap/dist/css/bootstrap.min.css")
        .pipe(gulp.dest("wwwroot/css"));
});

// Watch for changes
gulp.task("watch", function () {
    gulp.watch("./scss/**/*.scss", gulp.series("sass"));
});

// Default task
gulp.task("default", gulp.series("bootstrap", "sass", "watch"));