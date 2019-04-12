const path = require('path')

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const resolve = dir => {
  return path.resolve(__dirname, '..', dir)
}

module.exports = {
  mode: 'production',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js',
    publicPath: '/',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: resolve('node_modules'),
        use: require.resolve('babel-loader')
      },
      {
        test: /\.css$/,
        use: [require.resolve('style-loader'), require.resolve('css-loader')]
      },
      {
        test: /\.(sass|scss)$/,
        exclude: /\.module\.(sass|scss)$/,
        use: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
          require.resolve('sass-loader')
        ]
      },
      {
        test: /\.module\.(sass|scss)$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true
            }
          },
          require.resolve('sass-loader')
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|svg)$/,
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/fonts/[name].[hash:8].[ext]'
        }
      }
    ]
  }
}