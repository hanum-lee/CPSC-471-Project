let http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('../Frontend'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hello World!');
  });

app.get('/login',function(req,res){
    res.send("Login request");
});

app.get('/numOfRecipe',function(req,res){

});

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
