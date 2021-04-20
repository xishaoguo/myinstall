var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const argv = require('yargs-parser')(process.argv.slice(2))
const _mode = argv.mode || "development";
const _prodMode = (_mode == "production" ? true:false);
const mergeConfig = require(`./config/webpack.${_mode}.js`);
const { merge } = require('webpack-merge');
let webpackConfig = module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin()
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: _prodMode ? "styles/[name].[contenthash:5].css":"styles/[name].css",
      chunkFilename: _prodMode ? "styles/[id].[contenthash:5].css":"styles/[id].css"
    }),
    new HtmlWebpackPlugin({
      title: '看看我的页面吧',
      template: './src/index.html',
      favicon: path.resolve('src/favicon.ico')
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [ MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
      before(app) {
          app.get("/api/test", (req, res) => {
              res.json({
                  code: 200,
                  message: "Hello World"
              });
          });
      }
  },
}
module.exports = merge(mergeConfig,webpackConfig)