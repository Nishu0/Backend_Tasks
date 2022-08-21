const mongoose=require('mongoose')

var nSchema=new mongoose.Schema({
	title:{
		type:String,
		required:true
	},
	description:{
		type:String
	},
	tags:{
		type:[String]
	},
	user:{
		type:String,
		required:true
	}
})

const NotesSchema=mongoose.model('notes',nSchema)
module.exports=NotesSchema