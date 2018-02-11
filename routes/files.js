var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
       
        res.render('files', { title: "" });
});

router.get('/:dir(*)', function(req, res, next) {
	var dir = req.params.dir;
	res.render('files', { title: dir });
});

module.exports = router;
