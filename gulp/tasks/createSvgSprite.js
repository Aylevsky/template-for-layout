import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';

import { filePaths } from '../config/paths.js';
import { logger } from '../config/logger.js';
import fs from 'fs';

export const createSvgSprite = () => {
  if (fs.existsSync(`${filePaths.srcFolder}/icons`)) {
    return gulp.src(filePaths.src.svgIcons, { encoding: false })
      .pipe(logger.handleError('COPY ROOT FILES'))
      .pipe(
        svgSprite({
          mode: {
            symbol: {
              sprite: '../sprite.svg',

              /** Создавать страницу с перечнем иконок */
              example: true,
            },
          },
        }),
      )
      .pipe(gulp.dest(filePaths.build.images));
  } else {
    console.log("SVG иконки для спрайта не обнаружены")
    return Promise.resolve();
  }

};
