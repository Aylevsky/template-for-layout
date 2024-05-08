export const copy = () => {
  return app.gulp.src(app.path.src.copyFiles)
    .pipe(app.gulp.dest(app.path.build.copyFiles))
}