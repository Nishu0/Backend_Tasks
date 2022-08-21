const mongoose=require('mongoose')

const bSchema=new mongoose.Schema({
	link:{
		type:String,
		required:true
	},
	title:{
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
const BookmarkSchema=mongoose.model('bookmark',bSchema)
module.exports=BookmarkSchema