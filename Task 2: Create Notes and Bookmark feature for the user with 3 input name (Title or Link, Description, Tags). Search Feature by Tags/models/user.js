const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config({path:'config.env'})
var schema=new mongoose.Schema({
	id:{
		type:String
	},
	name:{
		type:String,
		required:true,
	},
	email:{
		type:String,
		required:true,
		unique:true,
	},
	password:{
		type:String,
		required:true,
		minLength:8,
		unique:true
	}
})

const Userdb=mongoose.model('userdb',schema)
module.exports=Userdb