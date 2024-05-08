import fileinclude from "gulp-file-include";
import pug from "gulp-pug";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import rename from "gulp-rename";

export const pugFiles = () => {
  return app.gulp
    .src(app.path.src.pug)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError(function (error) {
          console.log("\x1b[31m", error.message, "\x1b[0m");
        })
      )
    )
    .pipe(
      pug({
        // Сжимать HTML
        pretty: true,

        // Показывать название файла в терминале
        verbose: true,
      })
    )
    .pipe(app.plugins.replace(/@img\//g, "./images/"))
    .pipe(fileinclude())
    .pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
    .pipe(
      app.plugins.if(
        app.isDev,
        versionNumber({
          value: "%DT%",
          append: {
            key: "_v",
            cover: 0,
            to: ["css", "js"],
          },
          output: {
            file: "gulp/version.json",
          },
        })
      )
    )
    .pipe(rename({ dirname: '' }))
    .pipe(app.gulp.dest(app.path.build.pug))
    .pipe(app.plugins.browserSync.stream());
};
