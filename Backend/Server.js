let http = require('http');
let mysql = require('mysql');


var connection = mysql.createConnection({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: 'mySQL1234!',
	database: 'recipesearcher',
	multipleStatements: true
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('../Frontend'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
app.get('/', function (req, res) {
    res.send('Hello World!');
  });

connection.connect(function(err) {
	if(!err) {
		console.log("Connected to database...");
	}else {
		console.log("Error connecting to database...");
}});
app.get("/", function(req,res) {
	connection.query('Select * from user_recipesearcher', function(err, rows, fields) {
		connection.end();
		if(!err)
			console.log(rows);
		else
			console.log('error while performing query.');
	})
});
  */
app.post('/login',function(req,res){
    let userid = req.body.username;
    let passwd = req.body.password;
    console.log(userid);
    console.log(passwd);
    connection.connect(function (err) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		connection.query('CALL log_in(?,?)',[req.body.username, req.body.password], function(err, rows, fields) {
			connection.end();
			console.log(rows);
			if (err) {
				console.log("Error in query");
				res.status(400).send(err);
			}
			res.status(200).send(rows);
		});
	});
	
});
/*
app.get('/numOfRecipe',function(req,res){

});
*/
app.get('/editRecipe',function(req,res){

});

app.post('/recipeUpdate',function(req,res){

});

app.get('/recipeAdd',function(req,res){

});

app.get('/register',function(req,res){

});

app.get('/recipeData',function(req,res){

});

app.listen(port, () => console.log(`Server listening on port ${port}`));
/*
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
}).listen(8080);
*/
