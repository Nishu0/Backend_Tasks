const {Pool}=require('pg')
const pool = new Pool({
	user: 'postgres',     
	host: '127.0.0.1',     
	database: 'postgres',     
	password: 'sergtsop',     
	port: '5432'
}); 
pool.query("CREATE DATABASE myApp;", (err, res) => {     
	console.log(err, res);     
	pool.query("CREATE TABLE session(sessionguid UUID NOT NULL, created text NOT NULL, sessionlife integer NOT NULL)", (err, res) => {         
		console.log(err, res);         
		pool.end();     
	}); 
}); 
