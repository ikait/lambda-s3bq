import path from "path";
import gulp from "gulp";
import zip from "gulp-zip";
import babel from "gulp-babel";
import mocha from "gulp-mocha";
import eslint from "gulp-eslint";
import install from "gulp-install";
import plumber from "gulp-plumber";
import sourcemaps from "gulp-sourcemaps";


gulp.task("lint", () =>
    gulp.src("src/**/*.js")
        .pipe(eslint({useEslintrc: true}))
        .pipe(eslint.format("stylish"))
        .pipe(eslint.failAfterError()));

gulp.task("test", () =>
    gulp.src(["src/**/*.js"])
        .pipe(mocha({require: ["espower-babel/guess"]})));

gulp.task("babel", () =>
    gulp.src("src/**/*.js")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("build")));

gulp.task("install", () =>
    gulp.src("./package.json")
        .pipe(gulp.dest("build"))
        .pipe(install({production: true})));

gulp.task("copy", () =>
    gulp.src(["./src/**/*.json"], {base: "src"})
        .pipe(gulp.dest("build")));

gulp.task("zip", () =>
    gulp.src("./build/**/*")
        .pipe(zip("build.zip"))
        .pipe(gulp.dest(".")));

gulp.task("build", ["babel", "install", "copy"]);
