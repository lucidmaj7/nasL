var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('api', { title: 'nasL API' });
});

router.get('/file', function(req, res, next) {
  res.render('api', { title: 'nasL API' });
});

router.get('/file/list/:dir(*)', function(req,res,next){
	console.log("api file list == " +req.params.dir);
	var dir = req.params.dir;
	dir = "/"+dir;
	var f;
	var searchPath = '/hdd'+dir;
	fs.readdir(searchPath, (err, files) => {
		if(files)
		{	

			var dirArray= new Array( );
			files.forEach(file => {	
				stats= fs.statSync(searchPath+'/'+file);
    				console.log(file);
				var item = new Object();
				var path = dir+'/'+file;
				var resultPath=	path.replace( /\/\//gi, '/');
				console.log("path "+resultPath);
				item.path = resultPath;
				item.isDir = stats.isDirectory();
				item.name = file;
				item.size = stats.size;
				item.createTime=stats.birthtime;
				dirArray.push(item);
				
  			});
	 		res.json(dirArray);
		}
		else
		{
			stats= fs.statSync(searchPath);
			if(stats)
			{
                var dirArray= new Array( );
            	var item = new Object();
                item.path = dir;
                item.isDir = stats.isDirectory();
                item.name = stats.name;
                item.size = stats.size;
                item.createTime=stats.birthtime;
                dirArray.push(item);
                res.json(dirArray);				


			}else{	
			var err = new Error('Not Found');
  			err.status = 404;
  			next(err);
			}
		}
	});
	console.log(f);
	//res.render('index',{title:f});

//        var err = new Error('Not Found');
//       err.status = 404;
 //       next(err);
                
});

router.get('/file/download/:dir(*)', function(req,res,next){
	var dir = req.params.dir;
        var f;
        var filePath = '/hdd/'+dir;
	res.download(filePath);


});




module.exports = router;
