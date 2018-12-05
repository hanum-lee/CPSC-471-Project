let http = require('http');
let mysql = require('mysql');

var pool = mysql.createPool({
	host: 'localhost',
	port: '3307',
	user: 'testing',
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

app.post('/login',function(req,res){

    pool.getConnection(function (err,connection) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		connection.query('CALL recipesearcher.log_in(?,?)',[req.body.username, req.body.password], function(err, rows, fields) {
			connection.release();
			console.log(rows[0])
			var myval = JSON.parse(JSON.stringify(rows[0]));
			var bool_value = myval[0].userexists == 'true';
			var aval;
			console.log(bool_value);
			if (bool_value) {
				aval = {userexists: "true"};
			}
			else {
				aval = {userexists: "false"};
			}
			console.log(aval);
			if (err) {
				console.log("Error in query");
				console.log(err);
				res.status(400).send(err);
			}
			res.status(200).send(JSON.stringify(aval));
		});
	});

});
//Call for what is present
app.post('/editRecipe',function(req,res){

	pool.getConnection(function (err,connection) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		console.log(req.body.username, req.body.password);
		connection.query('CALL recipesearcher.get_full_recipe(?,?)',[req.body.recipeNum,req.body.username], function(err, rows, fields) {
			connection.release();
			console.log(rows);
			if (err) {
				console.log("Error in query");
				console.log(err);
				res.status(400).send(err);
			}
			res.status(200).send(rows);
		});
	});
});
//Update recipe
app.post('/recipeUpdate',function(req,res){
	/*let recTitle = req.body.title;
	let recNum = req.body.number;
	let recDec = req.body.description;
	let recFoodType = req.body.foodType;
	let recIngr = req.body.ingredients;
	let recCook = req.body.cookware;
	let recSteps = req.body.steps;
	let rec.fav = req.body.favourite;
	let username = req.body.username;*/
	pool.getConnection(function (err,connection) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		connection.query('CALL recipesearcher.edit_recipe(?,?)',[req.body, req.body.author[0]], function(err, rows, fields) {
			connection.release();
			if (err) {
				console.log(err);
				console.log("Error in query");
				res.status(400).send(err);
			}
			res.status(200).send(rows);
		});
	});
});

app.post('/recipeAdd',function(req,res){
	/* recipeData form
recipeData = {
  title: <title>,
  author: <name>,
  number: <num>,
  description: <d>, (not now)
  foodType: [ft, ft, ....],
  ingredients: [i,i,....i],
  ingAmount: [ia,ia,ia..]
  cookware: [c,c...c],
  timeTake: <t>,
  steps: <s>
}
*/
	pool.getConnection(function (err,connection) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		console.log(req.body);
		var temp = req.body.author;
		connection.query('CALL recipesearcher.add_recipe(?,?)',[JSON.stringify(req.body), temp], function(err, rows, fields) {
			connection.release();
			if (err) {
				console.log(err);
				console.log("Error in query");
				res.status(400).send(err);
			}
			res.status(200).send(rows);
		});
	});
});

app.post('/register',function(req,res){
	pool.getConnection(function (err,connection) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		connection.query('CALL recipesearcher.add_user(?,?)',[req.body.username, req.body.password], function(err, rows, fields) {
			connection.release();
			console.log(rows[0])
			var myval = JSON.parse(JSON.stringify(rows[0]));
			var bool_value = myval[0].userexists == 'true';
			var aval;
			console.log(bool_value);
			if (bool_value) {
				aval = {userexists: "true"};
			}
			else {
				aval = {userexists: "false"};
			}
			console.log(aval);
			if (err) {
				console.log("Error in query");
				console.log(err);
				res.status(400).send(err);
			}
			res.status(200).send(JSON.stringify(aval));
		});
	});
});

app.post('/recipeData',function(req,res){
	var username = 'test';
	var rno = 1;
	pool.getConnection(function (err,connection) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		connection.query('CALL recipesearcher.get_full_recipe(?,?)',[1,'test'], function(err, rows, fields) {
			connection.release();
			if (err) {
				console.log("Error in query");
				res.status(400).send(err);
			}
			console.log(JSON.stringify(rows));
			outputjson = {
				title: rows[0][0].rname,
				author: rows[0][0].user_id,
				number: rows[0][0].NUM,
				foodType:[],
				ingredients:[],
				ingAmount:[],
				ingType:[],
				cookware:[],
				timeTake: rows[0][0].time_taken,
				steps: rows[0][0].directions,
				favourite: rows[4][0].bool
			};
			console.log("first"+ JSON.stringify(outputjson));
			for(var i = 0; i < rows[2].length;i++){
				outputjson['foodType'].push(rows[2][i].f_type);
			}
			for(var i = 0 ; i < rows[3].length; i ++){
				outputjson['ingredients'].push(rows[3][i].ing_name);
				outputjson['ingAmount'].push(rows[3][i].amount);
				outputjson['ingType'].push(rows[3][i]).ing_type;
			}
		
			for(var i = 0; i < rows[1].length;i++){
				outputjson['cookware'].push(rows[1][i].cookware);
			}
			console.log(JSON.stringify(outputjson));
			console.log(rows.length);
			res.status(200).send(outputjson);
		});

	});
	
	

	/*let recTitle = req.body.title;
	let recNum = req.body.number;
	let recDec = req.body.description;
	let recFoodType = req.body.foodType;
	let recIngr = req.body.ingredients;
	let recCook = req.body.cookware;
	let recSteps = req.body.steps;
	let rec.fav = req.body.favourite;
	let username = req.body.username;*/

});

app.post('/searchmyrecipes', function(req, res) {
	pool.getConnection(function (err,connection) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		console.log(req.body.username);
		connection.query('CALL recipesearcher.search_user(?)',req.body.username, function(err, rows, fields) {
			connection.release();
			if (err) {
				console.log("Error in query");
				res.status(400).send(err);
			}
			console.log(JSON.stringify(rows));
			let outputjson = {
				title:[],
				number:[],
				username:[]
			};
			for(var i = 0; i < rows[0].length; i++){
				outputjson['title'].push(rows[0][i].title);
				outputjson['number'].push(rows[0][i].NUM);
				outputjson['username'].push(rows[0][i].username);
			}
			console.log("out"+JSON.stringify(outputjson));
			res.status(200).send(JSON.stringify(outputjson));
		});
	});
});
app.post('/searchmyfavourites', function(req, res) {
	pool.getConnection(function (err,connection) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		console.log(req.body.username);
		connection.query('CALL recipesearcher.search_favorites(?)',req.body.username, function(err, rows, fields) {
			connection.release();
			if (err) {
				console.log("Error in query");
				res.status(400).send(err);
			}
			console.log(JSON.stringify(rows));
			let outputjson = {
				title:[],
				number:[],
				username:[]
			};
			for(var i = 0; i < rows[0].length; i++){
				outputjson['title'].push(rows[0][i].title);
				outputjson['number'].push(rows[0][i].NUM);
				outputjson['username'].push(rows[0][i].username);
			}
			console.log("out"+JSON.stringify(outputjson));
			res.status(200).send(JSON.stringify(outputjson));
		});
	});
});
app.post('/searchfoodname', function(req, res) {
	pool.getConnection(function (err,connection) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		console.log(req.body.searchInput);
		connection.query('CALL recipesearcher.search_food(?)',req.body.searchInput, function(err, rows, fields) {
			connection.release();
			if (err) {
				console.log("Error in query");
				res.status(400).send(err);
			}
			console.log(JSON.stringify(rows));
			let outputjson = {
				title:[],
				number:[],
				username:[]
			};
			for(var i = 0; i < rows[0].length; i++){
				outputjson['title'].push(rows[0][i].title);
				outputjson['number'].push(rows[0][i].NUM);
				outputjson['username'].push(rows[0][i].username);
			}
			console.log("out"+JSON.stringify(outputjson));
			res.status(200).send(JSON.stringify(outputjson));
		});
	});
});
app.post('/searchfoodtype', function(req, res) {
	pool.getConnection(function (err,connection) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		var temp = req.body.searchInput.split(",");
		let inputjson = {
			foodtype:[]
		};
		for (var i = 0; i < temp.length; i++) {
			inputjson['foodtype'].push(temp[i]);
		}
		console.log(JSON.stringify(inputjson));
		connection.query('CALL recipesearcher.search_foodtype(?)',JSON.stringify(inputjson), function(err, rows, fields) {
			connection.release();
			if (err) {
				console.log("Error in query");
				res.status(400).send(err);
			}
			console.log(JSON.stringify(rows));
			let outputjson = {
				title:[],
				number:[],
				username:[]
			};
			for(var i = 0; i < rows[0].length; i++){
				outputjson['title'].push(rows[0][i].title);
				outputjson['number'].push(rows[0][i].NUM);
				outputjson['username'].push(rows[0][i].username);
			}
			console.log("out"+JSON.stringify(outputjson));
			res.status(200).send(JSON.stringify(outputjson));
		});
	});
});
app.post('/searchcookware', function(req, res) {
	pool.getConnection(function (err,connection) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		var temp = req.body.searchInput.split(",");
		let inputjson = {
			cookware:[]
		};
		for (var i = 0; i < temp.length; i++) {
			inputjson['cookware'].push(temp[i]);
		}
		console.log(JSON.stringify(inputjson));
		connection.query('CALL recipesearcher.search_cookware(?)', JSON.stringify(inputjson), function(err, rows, fields) {
			connection.release();
			if (err) {
				console.log("Error in query");
				console.log(err);
				res.status(400).send(err);
			}
			console.log(JSON.stringify(rows));
			let outputjson = {
				title:[],
				number:[],
				username:[]
			};
			for(var i = 0; i < rows[0].length; i++){
				outputjson['title'].push(rows[0][i].title);
				outputjson['number'].push(rows[0][i].NUM);
				outputjson['username'].push(rows[0][i].username);
			}
			console.log("out"+JSON.stringify(outputjson));
			res.status(200).send(JSON.stringify(outputjson));
		});
	});
});

app.post('/searchingredients', function(req, res) {
	pool.getConnection(function (err,connection) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		var temp = req.body.searchInput.split(",");
		let inputjson = {
			ingredients:[]
		};
		for (var i = 0; i < temp.length; i++) {
			inputjson['ingredients'].push(temp[i]);
		}
		console.log(JSON.stringify(inputjson));
		connection.query('CALL recipesearcher.search_ingredient(?)', JSON.stringify(inputjson), function(err, rows, fields) {
			connection.release();
			if (err) {
				console.log("Error in query");
				console.log(err);
				res.status(400).send(err);
			}
			console.log(JSON.stringify(rows));
			let outputjson = {
				title:[],
				number:[],
				username:[]
			};
			for(var i = 0; i < rows[0].length; i++){
				outputjson['title'].push(rows[0][i].title);
				outputjson['number'].push(rows[0][i].NUM);
				outputjson['username'].push(rows[0][i].username);
			}
			console.log("out"+JSON.stringify(outputjson));
			res.status(200).send(JSON.stringify(outputjson));
		});
	});
});

app.post('/searchrecipe', function(req, res) {	//search recipe through name
	pool.getConnection(function (err,connection) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		connection.query('CALL recipesearcher.search_recipe(?)',req.body.searchInput, function(err, rows, fields) {
			connection.release();
			if (err) {
				console.log("Error in query");
				res.status(400).send(err);
			}
			console.log(JSON.stringify(rows));
			let outputjson = {
				title:[],
				number:[],
				username:[]
			};
			for(var i = 0; i < rows[0].length; i++){
				outputjson['title'].push(rows[0][i].title);
				outputjson['number'].push(rows[0][i].NUM);
				outputjson['username'].push(rows[0][i].username);
			}
			console.log("out"+JSON.stringify(outputjson));
			res.status(200).send(JSON.stringify(outputjson));
		});
	});
});
app.delete('/removefavorites', function(req, res) {
	pool.getConnection(function (err,connection) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		connection.query('CALL recipesearcher.remove_favorites(?,?)',[req.body.username, req.body.rno], function(err) {
			connection.release();
			if (err) {
				console.log("Error in query");
				res.status(400).send(err);
			}
			res.status(200).send();
		});
	});
});
app.delete('/deletereview', function(req, res) {	//might need to change function name
	pool.getConnection(function (err,connection) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		connection.query('CALL recipesearcher.delete_review(?,?)',[req.body.rno,req.body.username], function(err) {
			connection.release();
			if (err) {
				console.log("Error in query");
				res.status(400).send(err);
			}
			res.status(200).send(rows);
		});
	});
});
app.delete('/deleterecipe', function(req, res) {	//might need to change function name
	pool.getConnection(function (err,connection) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		connection.query('CALL recipesearcher.delete_recipe(?,?)',[req.body.rno,req.body.username], function(err) {
			connection.release();
			if (err) {
				console.log("Error in query");
				res.status(400).send(err);
			}
			res.status(200).send(rows);
		});
	});
});
app.post('/addeditreview', function(req, res) {	//might need to change function name
	pool.getConnection(function (err,connection) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		connection.query('CALL recipesearcher.addedit_review(?,?,?)',[req.body.rno,req.body.username,req.body.review], function(err) {
			connection.release();
			if (err) {
				console.log("Error in query");
				res.status(400).send(err);
			}
			res.status(200).send(rows);
		});
	});
});
app.post('/addfavorites', function(req, res) {
	pool.getConnection(function (err,connection) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		connection.query('CALL recipesearcher.add_favorites(?,?)',[req.body.rno, req.body.username], function(err, rows, fields) {
			connection.release();
			console.log(rows);
			if (err) {
				console.log("Error in query");
				res.status(400).send(err);
			}
			res.status(200).send(rows);
		});
	});
});

app.post('/getReviews', function(req, res) {
	//console.log(req.body.recipeNum);
	pool.getConnection(function (err,connection) {
		if (err) {
			console.log("Error connecting to database");
			res.status(400).send(err);
		}
		connection.query('CALL recipesearcher.get_review(?)',[req.body.recipeNum], function(err, rows, fields) {
			connection.release();
			console.log(JSON.stringify(rows));

			if (err) {
				console.log("Error in query");
				res.status(400).send(err);
			}
			/*
			{author
			description
			point}
			*/
			var outputjson = {
				author:[],
				text:[],
				point:[]
			};
			for(var i = 0; i < rows[0].length;i++){
				outputjson['author'].push(rows[0][i].author);
				outputjson['text'].push(rows[0][i].description);
				outputjson['point'].push(rows[0][i].point);
			}
			res.status(200).send(outputjson);
		});
	});
});
app.listen(port, () => console.log(`Server listening on port ${port}`));
