import webpack from 'webpack-stream'

export const js = () => {
  return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError(function (error) {
          console.log("\x1b[31m", error.message, "\x1b[0m");
        })
      )
    )
    .pipe(webpack({
      mode: app.isBuild ? 'production' : 'development',
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
      output: { filename: 'app.min.js' },
    }))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browserSync.stream())
}
