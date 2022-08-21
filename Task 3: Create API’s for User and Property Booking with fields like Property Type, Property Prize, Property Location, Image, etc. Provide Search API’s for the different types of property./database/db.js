const {Pool}=require('pg')
const dotenv=require('dotenv')
dotenv.config({path:'config.env'})
const pool = new Pool({
	user: 'postgres',     
	host: '127.0.0.1',     
	database: 'postgres',     
	password: 'sergtsop',     
	port: '5432'
});
const uuid = require('uuid');
module.exports=pool;