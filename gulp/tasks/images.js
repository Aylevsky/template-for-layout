import webp from 'gulp-webp'
import imagemin from "gulp-imagemin"

export const allImages = () => {
  // Images
  return (
    app.gulp
      // Images
      .src(app.path.src.images)
      .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'IMAGES',
          message: 'Error: <%= error.message %>'
        })
      ))
      .pipe(app.plugins.newer(app.path.build.images))
      .pipe(app.plugins.if(app.isBuild, webp()))
      .pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.images)))
      .pipe(app.plugins.if(app.isBuild, app.gulp.src(app.path.src.images)))
      .pipe(app.plugins.if(app.isBuild, app.plugins.newer(app.path.build.images)))
      .pipe(app.plugins.if(app.isBuild, imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 4 // 0 to 7
      })))
      .pipe(app.gulp.dest(app.path.build.images))

      // SVG
      .pipe(app.gulp.src(app.path.src.svg))
      .pipe(app.gulp.dest(`${app.path.build.images}`))

    //.pipe(app.plugins.browserSync.stream())
  )
}

export const blocksImages = () => {
  return (
    app.gulp
      // Images
      .src(app.path.src.blocksImages)
      .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'IMAGES',
          message: 'Error: <%= error.message %>'
        })
      ))
      .pipe(app.plugins.newer(`${app.path.build.images}/blocks`))
      .pipe(app.plugins.if(app.isBuild, app.gulp.dest(`${app.path.build.images}/blocks`)))
      .pipe(app.plugins.if(app.isBuild, app.gulp.src(app.path.src.images)))
      .pipe(app.plugins.if(app.isBuild, app.plugins.newer(`${app.path.build.images}/blocks`)))
      .pipe(app.plugins.if(app.isBuild, webp()))
      .pipe(app.plugins.if(app.isBuild, imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 4 // 0 to 7
      })))
      .pipe(app.gulp.dest(`${app.path.build.images}/blocks`))

      // SVG
      .pipe(app.gulp.src(app.path.src.blocksImagesSvg))
      .pipe(app.gulp.dest(`${app.path.build.images}/blocks`))

      .pipe(app.plugins.browserSync.stream())
  )
}