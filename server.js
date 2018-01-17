var express = require('express')
var bodyParser = require('body-parser')
var webpack = require('webpack')
var path = require('path')
var webpackConfig = require('./webpack.config')
var compiler = webpack(webpackConfig)
var router = require('./routes/router')
var http = require('http')

var app = express()

app.use(bodyParser.json())

app.use(router)

app.use(
  require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  })
)

app.use(require('webpack-hot-middleware')(compiler))

app.get(['/data'])

app.get([
  '/'
], function (req, res) {
  res.status(200).sendFile(path.join(__dirname, 'templates/dev.html'))
})

if (require.main === module) {
  var server = http.createServer(app)
  server.listen(process.env.PORT || 1616, '0.0.0.0', function () {
    console.log('Listening on %j', server.address()) // eslint-disable-line
  })
}
