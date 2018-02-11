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
	var dir = req.params.dir;
	var f;
	var searchPath = '/hdd/'+dir;
	fs.readdir(searchPath, (err, files) => {
		if(files)
		{	
	
//			f = files;	
 //			console.log(f);			
			var ReturnObject = new Object();
			ReturnObject.isList = true;
			var dirArray= new Array( );
			files.forEach(file => {	
				stats= fs.statSync(searchPath+'/'+file);
    				console.log(file);
				var item = new Object();
				item.path ='/'+dir+'/'+file;
				item.isDir = stats.isDirectory();
				item.name = file;
				item.size = stats.size;
				item.createTime=stats.birthtime;
				dirArray.push(item);
				
  			});
			ReturnObject.list = dirArray;
	 		res.json(ReturnObject);
		}
		else
		{
			stats= fs.statSync(searchPath);
			if(stats)
			{
				var ReturnObject = new Object();
	                        ReturnObject.isList = false;
        	                var dirArray= new Array( );
                	       
                  
                            	var item = new Object();
                                item.path ='/'+dir;
                                item.isDir = stats.isDirectory();
                                item.name = stats.name;
                                item.size = stats.size;
                                item.createTime=stats.birthtime;
                                dirArray.push(item);

                        
                        ReturnObject.list = dirArray;
                        res.json(ReturnObject);				


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
