//List of procedures to be used in node js
const mysql = require('mysql')

const options = {
	user: ''	// fill out a username for mysql
	password: '' //fill out password
	database: 'recipesearcher'
}
const connection = mysql.createConnection(options)

connection.connect(err=> {
	if (err) {
		console.error('Error while connecting to database')
		throw error
	}
})

//log in
connection.query('select id from user_recipesearcher where exists id = ? AND pswd = ?', [id, pswd],
					(error, user_recipesearcher, fields) => {
						if (error) {
							console.error('Error occured during query')
							throw error
						}
						console.log(user_recipesearcher)
					})

//Search Cookware
connection.query('select NUM, user_id, rname, time_taken from recipe where NUM in (select r_no from cookware_used where cookware in (?))', [/*some variable reprsenting array input*/],
					(error, recipe, fields) => {
						if (error) {
							console.error('Error occured during query')
							throw error
						}
						console.log(recipe)
					})
//Search Users -> used for when going into edit recipes
connection.query('select rname, time_taken, NUM from recipe where user_id = ?',[id],
					(error, recipe, fields) => {
						if (error) {
							console.error('Error occured during query')
							throw error
						}
						console.log(recipe)
					})	

//Search Recipe(names)
connection.query('select rname, time_taken, NUM from recipe where where rname = ?',[recipeName],
					(error, recipe, fields) => {
						if (error) {
							console.error('Error occured during query')
							throw error
						}
						console.log(recipe)
					})
//Search Food(names)
connection.query('select NUM, user_id, rname, time_taken from recipe as R where NUM IN (select r_no from food where fname = ?)', [foodname],
					(error, recipe, fields) => {
						if (error) {
							console.error('Error occured during query')
							throw error
						}
						console.log(recipe)
					})	

//Search Favorites
connection.query('select NUM, user_id, rname, time_taken from recipe where NUM IN (select r_no from favorites where user_id = ?)', [id],
					(error, recipe, fields) => {
						if (error) {
							console.error('Error occured during query')
							throw error
						}
						console.log(recipe)
					})	
