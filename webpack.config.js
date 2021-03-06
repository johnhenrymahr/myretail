'use strict'
let path = require('path')
const webpack = require('webpack')
const MD5HashPlugin = require('md5-hash-webpack-plugin')
const merge = require('webpack-merge')
const TARGET = process.env.npm_lifecycle_event
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist'),
  modules: path.join(__dirname, 'node_modules'),
  data: path.join(__dirname, 'bootstrap_data')
}

const common = {
  name: 'myretail',
  context: __dirname,
  entry: [
    PATHS.app + '/main'
  ],
  resolve: {
    modules: [
      path.resolve('./app'),
      path.resolve('./node_modules')
    ],
    extensions: ['.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    publicPath: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  }
}
if (TARGET === 'start') {
  module.exports = merge(common, {
    output: {
      publicPath: '/'
    },
    entry: [
      'webpack-hot-middleware/client'
    ],
    module: {
      rules: [
        {
          test: /\.less$/,
          use: ['style-loader', 'css-loader', 'less-loader']
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [['es2015', { modules: false }], 'react', 'stage-1', 'react-hmre'],
                plugins: ['transform-object-rest-spread', 'syntax-dynamic-import']
              }
            }
          ]
        }]
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        localDev: true,
        'SERVICE_URL': JSON.stringify('/api/lineItem')
      })
    ]
  })
} else if (TARGET === 'build' || TARGET === 'prepublish') {
  let autoprefixer = require('autoprefixer')
  let cssnano = require('cssnano')
  let ExtractTextPlugin = require('extract-text-webpack-plugin')
  let CleanWebpackPlugin = require('clean-webpack-plugin')
  let WebpackAutoInject = require('webpack-auto-inject-version')
  let ArchivePlugin = require('webpack-archive-plugin')
  let HtmlWebpackPlugin = require('html-webpack-plugin')
  let serviceUrl = process.env.SERVICE_URL || '/api/url/not/defined'

  module.exports = merge(common, {
    output: {
      path: PATHS.build,
      publicPath: '',
      filename: 'js/bundle-[chunkhash].js'
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader'
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [
                    autoprefixer({
                      browsers: ['> 5%']
                    }),
                    cssnano()
                  ]
                }
              },
              {
                loader: 'less-loader'
              }
            ]
          })
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-1'],
            plugins: ['transform-object-rest-spread']
          }
        }]
    },
    plugins: [
      new CleanWebpackPlugin([
        PATHS.build,
        path.join(__dirname, '*.zip'),
        path.join(__dirname, '*.tar'),
        path.join(__dirname, '*.tar.gz')
      ], {
        verbose: true,
        dry: false
      }),
      new ExtractTextPlugin({
        filename: 'css/styles-[contenthash].css',
        allChunks: true
      }),
      new webpack.DefinePlugin({
        'SERVICE_URL': JSON.stringify(serviceUrl),
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        minimize: true,
        output: {
          comments: false
        }
      }),
      new MD5HashPlugin(),
      new WebpackAutoInject({
        autoIncrease: false,
        injectByTag: false,
        injectAsComment: true
      }),
      new StatsWriterPlugin({
        filename: 'stats/stats.json',
        transform: function (data, opts) {
          return JSON.stringify({
            js: data.assetsByChunkName.main[0].split('/')[1],
            css: data.assetsByChunkName.main[1].split('/')[1]
          }, null, 2)
        }
      }),
      new HtmlWebpackPlugin({
        title: 'My Retail Page',
        template: path.join(__dirname, 'templates', 'prod.html')
      }),
      new ArchivePlugin()
    ]
  })
}
