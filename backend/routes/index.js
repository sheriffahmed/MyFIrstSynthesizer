var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.sendFile("/Users/c4q/Desktop/codingStuff/MyFIrstSynthesizer/view/index.html")
});

module.exports = router;
