const gulp = require('gulp');
const webpack = require('webpack-stream');
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.config.js");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const rimraf = require('rimraf');
const clientBuildPath = path.resolve('../', 'client_build/');

/* Base config without watches / devserver / etc */
const baseWebPackConfig = {
  context: path.join(__dirname, "src"),
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  entry: [
    './main.tsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(eot|png|jpg|gif|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    // Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', // Name of file in ./dist/
      template: 'index.html', // Name of template in ./src
      hash: true
    })
  ]
}

/* base webpack build function which can be augmeneted with additional configs */
const baseWebPackBuild = (additionalConfig) => {
  var config = Object.assign({}, baseWebPackConfig);

  if (additionalConfig)
    Object.assign(config, additionalConfig);

  return gulp.src('src/main.tsx')
    .pipe(webpack(
      config
      , require('webpack'/* https://github.com/shama/webpack-stream/issues/180 */)))
    .pipe(gulp.dest(clientBuildPath));
}

gulp.task('client-clean', done => {
  rimraf(`${clientBuildPath}/**/*`, (err) => done(err));
})

gulp.task('client-build-only', () => {
  return baseWebPackBuild();
});

gulp.task('client-watch-only', () => {
  return baseWebPackBuild({ watch: true });
});

gulp.task('client-build', gulp.series('client-clean', 'client-build-only'));

gulp.task('client-watch', gulp.series('client-clean', 'client-watch-only'));
