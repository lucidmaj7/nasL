var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
	console.log("1111");
	res.render('files', { title: "/" });
 //   res.redirect(301,req.ur+"/files")
});



router.get('/:dir(*)', function(req, res, next) {
	console.log("2222");
	req.params.dir;
	var dir = '/'+req.params.dir;
	if(dir.endsWith('/'))
	{
		 res.redirect(301, "/files"+dir.slice(0, -1));
		 return;
	}
	res.render('files', { title: dir });
});

module.exports = router;
