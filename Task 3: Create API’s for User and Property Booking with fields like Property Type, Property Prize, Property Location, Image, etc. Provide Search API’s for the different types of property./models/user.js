const {Pool}=require('pg')
const pool = new Pool({
	user: 'postgres',     
	host: '127.0.0.1',     
	database: 'postgres',     
	password: 'sergtsop',     
	port: '5432'
});
 
pool.query("CREATE DATABASE TASK3", (err, res) => {     
	console.log(err, res);     
	pool.query("CREATE TABLE userDetails(uid SERIAL NOT NULL, name VARCHAR(50) NOT NULL, email VARCHAR(50) NOT NULL,password VARCHAR(40) NOT NULL)", (err, res) => {         
		console.log(err, res);         
		pool.end();     
	}); 
}); 
