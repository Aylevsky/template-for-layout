import gulp from 'gulp';
import webp from 'gulp-webp';

import { plugins } from '../config/plugins.js';
import { filePaths } from '../config/paths.js';
import { logger } from '../config/logger.js';

export const componentsSVG = (isBuild, serverInstance) => {
  return gulp.src(filePaths.watch.componentsImages.svg, { encoding: false })
    .pipe(logger.handleError('IMAGES'))
    .pipe(plugins.newer(filePaths.build.componentsImages.svg))
    .pipe(plugins.if(isBuild, webp()))
    .pipe(plugins.if(isBuild, gulp.dest(filePaths.build.componentsImages.svg)))
    .pipe(plugins.if(isBuild, gulp.src(filePaths.watch.componentsImages.svg)))
    .pipe(plugins.if(isBuild, plugins.newer(filePaths.build.componentsImages.svg)))
    .pipe(gulp.dest(filePaths.build.componentsImages.svg))
    .pipe(serverInstance.stream());
};
