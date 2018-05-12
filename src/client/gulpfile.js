const gulp = require('gulp');
const wpStream = require('webpack-stream');
const WebpackDevServer = require("webpack-dev-server");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const rimraf = require('rimraf');

// list client packages here. cannot infer from package.json as node dependencies will hose it
const vendorNames = [
  "bootstrap",
  "react",
  "react-bootstrap",
  "react-dom",
  "react-redux",
  "react-router-bootstrap",
  "react-router-dom",
  "redux",
  "redux-thunk"
];

const clientBuildPath = path.resolve(__dirname, '../', '../', 'dist', 'client');

/* Base config without watches / devserver / etc */
const baseWebPackConfig = {
  context: path.join(__dirname),
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  entry: {
    app: path.resolve(__dirname, './client.tsx'),
    vendors: vendorNames
  },
  output: {
    path: clientBuildPath,
    filename: ' [name].js'
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
      //hash: true // seems to bust express.static for some reason?
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

  return gulp.src(path.resolve(__dirname, './client.tsx'))
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
