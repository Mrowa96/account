/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const ENV = process.env.NODE_ENV || 'production';
const BUILD_ANALYZE = process.env.BUILD_ANALYZE === '1';
const DEV_DISABLE_TYPE_CHECK = process.env.DEV_DISABLE_TYPE_CHECK === '1';

const isDev = ENV === 'development';
const plugins = [
  new CleanWebpackPlugin(),
  new EnvironmentPlugin({
    APP_URL: process.env.APP_URL,
    APP_API_URL: process.env.APP_API_URL,
    APP_API_PORT: process.env.APP_API_PORT,
  }),
];

if (BUILD_ANALYZE) {
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
    }),
  );
}

module.exports = {
  context: __dirname,
  target: 'node',
  externals: [nodeExternals()],
  mode: ENV,
  entry: path.resolve('./server/index.ts'),
  output: {
    filename: 'index.js',
    chunkFilename: '[name].js',
    path: path.resolve('./dist/server'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@': path.resolve('./src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'eslint-loader',
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: isDev && DEV_DISABLE_TYPE_CHECK,
        },
      },
    ],
  },
  plugins,
  stats: {
    assets: true,
    children: false,
    entrypoints: false,
    chunks: false,
    colors: true,
    performance: false,
    usedExports: false,
    modules: false,
  },
  devtool: isDev ? 'eval-source-map' : false,
};
