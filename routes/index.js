var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',
    author: 'Maria Zabilskaya' });
});

router.get('/about', function(req, res, next) {
  res.render('about', {
    title: 'Welcome to my homework',
    author: 'Maria Zabilskaya'
  });
});

router.get('/chat', function(req, res, next) {
  res.render('chat');
});

router.get('/blog', function(req, res, next) {
  res.render('blog');
  var db = res.db;
  var collection = db.get('bloglist');
  collection.find({},{},function(e,docs){
    res.render('blog', {
      "bloglist" : collection
    });
  });
});

module.exports = router;
