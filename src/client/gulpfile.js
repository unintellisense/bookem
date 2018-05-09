const gulp = require('gulp');
const wpStream = require('webpack-stream');
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.config.js");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const rimraf = require('rimraf');

const dependencyNames = Object.keys(require('../../package.json').dependencies);

const clientBuildPath = path.resolve('../', '../', 'dist', 'client');

/* Base config without watches / devserver / etc */
const baseWebPackConfig = {
  context: path.join(__dirname),
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  entry: {
    app: './main.tsx',
    vendors: dependencyNames
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: ' [name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader'
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
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: { test: /[\\/]node_modules[\\/]/, name: "vendors", chunks: "all" }
      }
    }
  }
}

/* base webpack build function which can be augmeneted with additional configs */
const baseWebPackBuild = (additionalConfig) => {
  var config = Object.assign({}, baseWebPackConfig);

  if (additionalConfig)
    Object.assign(config, additionalConfig);

  return gulp.src('main.tsx')
    .pipe(wpStream(
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
