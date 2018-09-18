const gulp          = require("gulp"),
      del           = require("del"),
      colors        = require("colors"),
      runSequence   = require("run-sequence");

gulp.task("clean", function () {
    try {
        del.sync(["backend/server/public/**", "!backend/server/public"]);
        console.log(`Backend public folder ${colors.underline.red("deleted")} successfully!`);
    } catch (e) {
        console.error(e)
    }
    return;
});

gulp.task("clean-build", function () {
    try {
        del.sync(["build/**/*", "!build/.git"]);
        console.log(`Build folder ${colors.underline.red("deleted")} successfully!`);
    } catch (e) {
        console.error(e)
    }
    return;
});

gulp.task("heroku-build", ["clean-build"], function () {
    return gulp.src([
        "backend/server/**/*",
        "!backend/server/node_modules/**/*",
        "!backend/server/*.sh"
    ])
        .pipe(gulp.dest("build"));
});

gulp.task("build", function () {
    return gulp.src([
        "frontend/dist/**/*"
    ])
        .pipe(gulp.dest("backend/server/public/"));
});

gulp.task("watch", function (cb) {

    runSequence("clean", "build", cb);

    var watcher = gulp.watch("frontend/dist/**/*", ["build"]);
    watcher.on("change", function (event) {
        console.log("File " + event.path + " was " + colors.underline.green(`${event.type}`));
    });
});


gulp.task("default", ["watch"]);