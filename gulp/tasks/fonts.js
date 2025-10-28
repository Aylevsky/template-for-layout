import gulp from 'gulp';
import fs from "fs";
import fonter from "gulp-fonter-unx";
import ttf2woff2 from "gulp-ttf2woff2";
import { filePaths } from '../config/paths.js';
import notify from 'gulp-notify/lib/notify.js';
import plumber from 'gulp-plumber';

export const otfToTtf = () => {
  // Ищем файлы шрифтов .otf
  return (
    gulp
      .src(`${filePaths.srcFolder}/fonts/**/*.otf`, { encoding: false })
      .pipe(
        plumber(
          notify.onError(function (error) {
            return "\x1b[31m" + error.message + "\x1b[0m";
          })
        )
      )
      // Конвертируем в .ttf
      .pipe(
        fonter({
          formats: ["ttf"],
        })
      )
      // Выгружаем в исходную папку
      .pipe(gulp.dest(`${filePaths.srcFolder}/fonts/`))
  );
};

export const ttfToWoff = () => {
  // Ищем файлы шрифтов .ttf
  return (
    gulp
      .src(`${filePaths.srcFolder}/fonts/**/*.ttf`, { encoding: false })
      .pipe(
        plumber(
          notify.onError(function (error) {
            return "\x1b[31m" + error.message + "\x1b[0m";
          })
        )
      )
      // Конвертируем в .woff
      .pipe(
        fonter({
          formats: ["woff"],
        })
      )
      // выгружаем в папку с результатом
      .pipe(gulp.dest(`${filePaths.build.fonts}`))
      // ищем файлы шрифтов .ttf
      .pipe(gulp.src(`${filePaths.srcFolder}/fonts/**/*.ttf`, { encoding: false }))
      // конвертируем в .woff2
      .pipe(ttf2woff2())
      // выгружаем в папку с результатом
      .pipe(gulp.dest(`${filePaths.build.fonts}`))
  );
};

export const fontStyle = () => {
  // Файл стилей подключения шрифтов
  let fontsFile = `${filePaths.fontsFile}`;

  // Проверяем существуют ли файлы шрифтов
  fs.readdir(`${filePaths.build.fonts}`, function (err, fontsFiles) {
    if (fontsFiles) {
      // Проверяем существует ли файл стилей для подключения шрифтов
      if (!fs.existsSync(fontsFile)) {
        // Если файла нет, создаем его
        fs.writeFile(fontsFile, "", cb);
        let newFileOnly;

        for (var i = 0; i < fontsFiles.length; i++) {
          // Записываем подключения шрифтов в файл стилей
          let fontFileName = fontsFiles[i].split(".")[0];

          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split("-")[0]
              ? fontFileName.split("-")[0]
              : fontFileName;

            let fontWeight = fontFileName.split("-")[1]
              ? fontFileName.split("-")[1]
              : fontFileName;

            if (fontWeight.toLowerCase() === "thin") {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === "extralight") {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === "light") {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === "medium") {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === "semibold") {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === "bold") {
              fontWeight = 700;
            } else if (
              fontWeight.toLowerCase() === "extrabold" ||
              fontWeight.toLowerCase() === "heavy"
            ) {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === "black") {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }

            fs.appendFile(
              fontsFile,
              `@font-face {
                font-family: "${fontName}";
                font-display: swap;
                src: url("../fonts/${fontFileName}.woff2") format("woff2"),
                    url("../fonts/${fontFileName}.woff") format("woff");
                font-weight: ${fontWeight};
                font-style: normal;
              }\r\n`,
              cb
            );
            newFileOnly = fontFileName;
          }
        }
      } else {
        // Если файл есть нужно его удалить
        console.log(
          "Файл styles/default/fonts.scss уже существует. Для обновления файла нужно его удалить!"
        );
      }
    }
  });

  return gulp.src(`${filePaths.srcFolder}`, { encoding: false });
  function cb() { }
};