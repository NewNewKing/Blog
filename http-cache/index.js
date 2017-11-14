const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer().listen(3000);

server.on('request',(req,res) => {
	const url = path.join(__dirname,'static',req.url);
	fs.readFile(url,(err,data) => {
		// Etag
		// 如果设置了Etag 则在之后请求头里携带If-None-Match
		if(req.headers['if-none-match'] == 'hello'){
			res.statusCode = 304;
			res.end();
		}else{
			res.setHeader('Etag', 'hello');
			res.end(data);
		}
		// Last-Modified
		// 如果设置了Last-Modified 则在之后请求头里携带If-Modified-Since
		if(req.headers['if-modified-since']){
			res.statusCode = 304
    		res.end()
		}else{		
			res.setHeader('Last-Modified', new Date().toUTCString());
			res.end(data);
		}

		// 设置强缓存，在时间过期之前都从本地读取文件 以秒计
		res.setHeader('Cache-Control','max-age=5');

		res.end(data);
		
	})	
});