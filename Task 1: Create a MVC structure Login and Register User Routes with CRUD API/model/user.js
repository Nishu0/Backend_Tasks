
const mongoose=require('mongoose');
var schema=new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		require:true,
		unique:true
	},
	password:{
		type:String,
		required:true,
		minlength: 8,
		unique:true
	},
	address:String,
	age:Number
})

const Userdb=mongoose.model('userdb',schema);
module.exports=Userdb;