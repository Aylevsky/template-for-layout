import gulp from "gulp"; // Основной модуль
import { path } from "./gulp/config/path.js"; // Импорт путей
import { plugins } from "./gulp/config/plugins.js"; // Импорт общих плагинов

// Передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path: path,
  gulp: gulp,
  plugins: plugins,
};

// Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { pugFiles } from "./gulp/tasks/pug.js";
import { js } from "./gulp/tasks/js.js";
import { allImages, blocksImages } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

// Последовательная обработка картинок
const images = gulp.series(allImages, blocksImages);

// Наблюдатель за изменениями в файлах
function watcher() {
  gulp.watch(path.watch.copyFiles, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, allImages);
  gulp.watch(path.watch.blocksImages, blocksImages);
  gulp.watch(path.watch.pug, pugFiles);
}

export { svgSprive };

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);

// Основные задачи
const mainTasks = gulp.series(
  copy,
  fonts,
  gulp.parallel(pugFiles, html, scss, js, images)
);

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// Экспорт сценариев
export { dev };
export { build };
export { deployZIP };
export { deployFTP };

// Выполнение сценария по умолчанию
gulp.task("default", dev);
