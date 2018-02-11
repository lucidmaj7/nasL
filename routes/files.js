var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:dir(*)', function(req, res, next) {
	var dir = req.params.dir;
	res.render('files', { title: dir });
});

module.exports = router;
