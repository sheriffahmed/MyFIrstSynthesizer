var express = require('express');
var router = express.Router();
var path = require('path')

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log(path.resolve(__dirname, '../'))
  res.sendFile("view/index.html", {"root": path.resolve(__dirname, '../') })
});

module.exports = router;
