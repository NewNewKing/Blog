const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer().listen(3000);

server.on('request',(req,res) => {
	const url = path.join(__dirname,'static',req.url);
	fs.readFile(url,(err,data) => {
		res.end(data);
	})	
});