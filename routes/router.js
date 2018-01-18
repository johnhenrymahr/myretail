var express = require('express')
var path = require('path')
var router = express.Router()

router.get('/api/lineItem', function (req, res) {
  res
    .type('json')
    .status(200)
    .sendFile(path.join(__dirname, 'data', 'item-data.json'))
})

module.exports = router
