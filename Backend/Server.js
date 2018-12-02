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
app.get('/editRecipe',function(req,res){

});

app.post('/recipeUpdate',function(req,res){

});

app.get('/recipeAdd',function(req,res){

});

app.get('/register',function(req,res){
	connection.connect(function (err) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		connection.query('CALL add_user(?,?)',[req.body.username, req.body.password], function(err, rows, fields) {
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

app.get('/recipeData',function(req,res){
	
});

app.get('/searchfavorites', function(req, res) {	//might need to change function name
	connection.connect(function (err) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		connection.query('CALL search_favorites(?)',[req.body.username], function(err, rows, fields) {
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
app.get('/searchuser', function(req, res) {	//might need to change function name - this function is called when someone clicks on edit existing recipes to figure out which recipe they want to edit
	connection.connect(function (err) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		connection.query('CALL search_user(?)',[req.body.username], function(err, rows, fields) {
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
app.get('/searchfood', function(req, res) {	//might need to change function name - function to search by food name
	connection.connect(function (err) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		connection.query('CALL search_food(?)',[req.body.foodname], function(err, rows, fields) {
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
app.get('/removefavorites', function(req, res) {	//might need to change function name - function takes in username and the recipe-no
	connection.connect(function (err) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		connection.query('CALL remove_favorites(?,?)',[req.body.username, req.body.rno], function(err) {
			connection.end();
			if (err) {
				console.log("Error in query");
				res.status(400).send(err);
			}
			res.status(200).send(rows);
		});
	});
});
app.get('/deletereview', function(req, res) {	//might need to change function name
	connection.connect(function (err) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		connection.query('CALL delete_review(?,?)',[req.body.rno,req.body.username], function(err) {
			connection.end();
			if (err) {
				console.log("Error in query");
				res.status(400).send(err);
			}
			res.status(200).send(rows);
		});
	});
});
app.get('/deleterecipe', function(req, res) {	//might need to change function name
	connection.connect(function (err) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		connection.query('CALL delete_recipe(?,?)',[req.body.rno,req.body.username], function(err) {
			connection.end();
			if (err) {
				console.log("Error in query");
				res.status(400).send(err);
			}
			res.status(200).send(rows);
		});
	});
});
app.get('/addeditreview', function(req, res) {	//might need to change function name
	connection.connect(function (err) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		connection.query('CALL addedit_review(?,?,?)',[req.body.rno,req.body.username,req.body.review], function(err) {
			connection.end();
			if (err) {
				console.log("Error in query");
				res.status(400).send(err);
			}
			res.status(200).send(rows);
		});
	});
});
app.get('/addfavorites', function(req, res) {	//might need to change function name
	connection.connect(function (err) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		connection.query('CALL add_favorites(?,?)',[req.body.rno, req.body.username], function(err, rows, fields) {
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
app.listen(port, () => console.log(`Server listening on port ${port}`));
