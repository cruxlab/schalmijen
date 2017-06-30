import express from 'express';


let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.writeHead('200', {'Content-Type' : 'text/plain'});
  res.end('Hello World\n');
  //res.render('index', { title: 'Express' });
});

module.exports = router;
