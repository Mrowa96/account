/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const StylelintPlugin = require('stylelint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');
const { removeJsxAttributesTransformer } = require('typescript-transformer-jsx-remove-attributes');

const ENV = process.env.NODE_ENV || 'production';
const BUILD_ANALYZE = process.env.BUILD_ANALYZE === '1';
const DEV_DISABLE_TYPE_CHECK = process.env.DEV_DISABLE_TYPE_CHECK === '1';
const DEV_APP_PORT = process.env.DEV_APP_PORT || 3000;

const isDev = ENV === 'development';
const isProd = !isDev;
const stats = {
  assets: true,
  children: false,
  entrypoints: false,
  chunks: false,
  colors: true,
  performance: false,
  usedExports: false,
  modules: false,
};
const plugins = [
  new StylelintPlugin({
    files: '../**/*.scss',
  }),
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: path.resolve('./src/static/main.ejs'),
    scriptLoading: 'defer',
  }),
  new FaviconsWebpackPlugin({
    logo: path.resolve('./src/static/images/icon.png'),
    inject: true,
    prefix: 'assets/',
    favicons: {
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        windows: false,
        yandex: false,
      },
    },
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve('./src/static/images'),
        to: path.resolve('./dist/client/images'),
        globOptions: {
          ignore: [path.resolve('./src/static/images/*.xcf')],
        },
      },
    ],
  }),
  new EnvironmentPlugin({
    APP_URL: process.env.APP_URL,
    APP_API_URL: process.env.APP_API_URL,
    APP_API_PORT: process.env.APP_API_PORT,
  }),
];

if (isProd) {
  plugins.push(new OptimizeCSSAssetsPlugin());
  plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
  );
}

if (BUILD_ANALYZE) {
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
    }),
  );
}

module.exports = {
  context: __dirname,
  mode: ENV,
  entry: {
    main: path.resolve('./client/index.tsx'),
  },
  output: {
    filename: 'app.[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve('./dist/client'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@': path.resolve('./src/'),
      '@client': path.resolve('./client/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({
            before: [removeJsxAttributesTransformer(['data-testid'])],
          }),
          transpileOnly: isDev && DEV_DISABLE_TYPE_CHECK,
        },
      },
      {
        test: /\.scss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                includePaths: [path.resolve('./src/styles')],
              },
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 300000,
  },
  plugins,
  stats,
  devtool: isDev ? 'eval-source-map' : false,
  devServer: {
    contentBase: path.resolve('./dist/client'),
    port: DEV_APP_PORT,
    hot: false,
    inline: false,
    stats,
    historyApiFallback: true,
  },
};
