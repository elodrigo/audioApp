const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/',
  },
  target: 'web',
  resolve: {
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [!prod && require.resolve('react-refresh/babel')].filter(Boolean),
          },
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[hash.[ext]',
              limit: 10000,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  devtool: false,
  plugins: [
    !prod && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ].filter(Boolean),
  devServer: {
    hot: true,
    open: false,
    static: path.resolve(__dirname, 'dist/'),
  },
  optimization: {
    runtimeChunk: 'single',
  },
};