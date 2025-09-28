import gulp from 'gulp';
import { plugins } from '../config/plugins.js';
import { filePaths } from '../config/paths.js';
import { logger } from '../config/logger.js';

export const svg = (isBuild, serverInstance) => {
  return gulp.src(filePaths.src.svg)
    .pipe(logger.handleError('IMAGES'))
    .pipe(plugins.newer(filePaths.build.images))
    .pipe(plugins.if(isBuild, gulp.dest(filePaths.build.images)))
    .pipe(plugins.if(isBuild, gulp.src(filePaths.src.svg)))
    .pipe(plugins.if(isBuild, plugins.newer(filePaths.build.images)))
    .pipe(gulp.dest(filePaths.build.images))
    .pipe(serverInstance.stream());
};