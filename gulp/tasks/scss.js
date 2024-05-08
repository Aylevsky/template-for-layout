import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import sassGlob from "gulp-sass-glob";

import cleanCss from "gulp-clean-css"; // Сжатие CSS файла
import webpcss from "gulp-webpcss"; // Вывод WEBP изображений
import autoPrefixer from "gulp-autoprefixer"; // Добавление вендорных префиксов
import groupCssMediaQueries from "gulp-group-css-media-queries"; // Группировка медиа запросов

const sass = gulpSass(dartSass);
const code = `
  /*@mixin a_size($w, $h: "none") {
    @if ($h =="none") {
      @include adaptiv-value(width, $w, $w, 1);
      @include adaptiv-value(height, $w, $w, 1);
    }

    @else {
      @include adaptiv-value(width, $w, $w, 1);
      @include adaptiv-value(height, $h, $h, 1);
    }
  }*/

  @import "./default/const.scss";
  @import "./default/functions.scss";
  @import "./default/mixins.scss";
`

export const scss = () => {
  return (
    app.gulp
      .src(app.path.src.scss, { sourcemaps: app.isDev })
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError(function (error) {
            console.log("\x1b[31m", error.message, "\x1b[0m");
          })
        )
      )
      .pipe(sassGlob())
      .pipe(sass({ outputStyle: "expanded" }))

      /************************************************************************************/
      .pipe(app.plugins.replace('/*****/', `${code}`))
      .pipe(app.plugins.replace('@size-d', `@include size`))
      .pipe(app.plugins.replace('@size', `@include a_size`))
      .pipe(app.plugins.replace('@line-height', `@include line-height`))
      .pipe(app.plugins.replace('@ad', `@include adaptiv-value`))
      /************************************************************************************/

      .pipe(sass({ outputStyle: "expanded" }))
      .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
      .pipe(
        app.plugins.if(
          app.isBuild,
          webpcss({
            webpClass: ".webp",
            noWebpClass: ".no-webp",
          })
        )
      )
      .pipe(
        app.plugins.if(
          app.isBuild,
          autoPrefixer({
            grid: true,
            overrideBrowserslist: ["last 3 versions"],
            cascade: true,
          })
        )
      )
      .pipe(app.plugins.replace(/@img\//g, "../images/"))
      .pipe(app.plugins.replace(/@css\//g, "css/"))


      .pipe(app.plugins.browserSync.stream())
      // Раскомментировать если нужен не сжатый дубль файла стилей
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.if(app.isBuild, cleanCss()))
      .pipe(rename({ extname: ".min.css" }))
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browserSync.stream())
  );
};

// app.plugins.if(app.isBuild, )
