var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
	console.log("1111");
	res.render('files', { title: "/" });

});



router.get('/:dir(*)', function(req, res, next) {
	console.log("2222");
	var dir = '/'+req.params.dir;
	res.render('files', { title: dir });
});

module.exports = router;
