/**
 *  Копирует шрифты (версии до преобразования в woff2 и шрифты которые 
 *  изначально были в формате woff2) из папки со шрифтами в ./dist/fonts
 */
import gulp from 'gulp';

import { filePaths } from '../config/paths.js';
import { logger } from '../config/logger.js';

export const copyFonts = () => {
  return gulp.src([`${filePaths.src.fonts}**/*.woff`, `${filePaths.src.fonts}**/*.woff2`], { encoding: false })
    .pipe(logger.handleError('COPY'))
    .pipe(gulp.dest(filePaths.build.fonts))
};
