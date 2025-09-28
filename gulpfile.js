import gulp from 'gulp';
import browserSync from 'browser-sync';
import { filePaths } from './gulp/config/paths.js';

/**
 * Импорт задач
 */
import { copy } from './gulp/tasks/copy.js';
import { copyRootFiles } from './gulp/tasks/copyRootFiles.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { javascript } from './gulp/tasks/javascript.js';
import { otfToTtf, ttfToWoff, fontStyle } from './gulp/tasks/fonts.js';
import { createSvgSprite } from './gulp/tasks/createSvgSprite.js';
import { zip } from './gulp/tasks/zip.js';
import { ftpDeploy } from './gulp/tasks/ftpDeploy.js';
import { pug } from './gulp/tasks/pug.js';
import { images } from './gulp/tasks/images.js';
import { componentsImages } from './gulp/tasks/componentsImages.js';
import { componentsSVG } from './gulp/tasks/componentsSVG.js';
import { svg } from './gulp/tasks/svg.js';

const isBuild = process.argv.includes('--build');
const browserSyncInstance = browserSync.create();

const handleServer = server.bind(null, browserSyncInstance);
const handleHTML = html.bind(null, isBuild, browserSyncInstance);
const handlePUG = pug.bind(null, isBuild, browserSyncInstance);
const handleSCSS = scss.bind(null, isBuild, browserSyncInstance);
const handleJS = javascript.bind(null, !isBuild, browserSyncInstance);
const handleImages = images.bind(null, isBuild, browserSyncInstance);
const handleSvg = svg.bind(null, isBuild, browserSyncInstance);
const handleComponentsImages = componentsImages.bind(null, isBuild, browserSyncInstance);
const handleComponentsSVG = componentsSVG.bind(null, isBuild, browserSyncInstance);

/**
 * Наблюдатель за изменениями в файлах
 */
function watcher() {
  gulp.watch(filePaths.watch.static, copy);
  gulp.watch(filePaths.watch.html, handleHTML);
  gulp.watch(filePaths.watch.pug, handlePUG);
  gulp.watch(filePaths.watch.scss, handleSCSS);
  gulp.watch(filePaths.watch.js, handleJS);
  gulp.watch(filePaths.watch.images, handleImages);
  gulp.watch(filePaths.watch.svg, handleSvg);
  gulp.watch(filePaths.watch.componentsImages.images, handleComponentsImages);
  gulp.watch(filePaths.watch.componentsImages.svg, handleComponentsSVG);
}

/**
 * Последовательная обработка шрифтов
 * */
const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);

/**
 * Параллельные задачи в режиме разработки
 * */
const devTasks = gulp.parallel(copy, copyRootFiles, createSvgSprite, handleHTML, handlePUG, handleSCSS, handleJS, handleImages, handleSvg, handleComponentsImages, handleComponentsSVG);

/**
 * Основные задачи
 * */
const mainTasks = gulp.series(fonts, devTasks);

/**
 * Построение сценариев выполнения задач
 * */
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, handleServer));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftpDeploy);

/**
 * Выполнение сценария по умолчанию
 * */
gulp.task('default', dev);

/**
 * Экспорт сценариев
 * */
export { dev, build, deployZIP, deployFTP, createSvgSprite };
