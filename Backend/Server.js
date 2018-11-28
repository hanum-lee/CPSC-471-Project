let http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
}).listen(8080);

/*
var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost", 
	user: "",		//need to add in id
	password: ""	// need to add in a password
});
con.connect(function(err) {
	if (err)throw err;
	console.log("Connected!");
});
*/