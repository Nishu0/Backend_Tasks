const Note=require("../models/notes")
exports.newnote=async(req,res)=>{
	try{
		const { title, description,tags } = req.body;
  		if (!title) {
    		res.send("Please Write a Title.");
  		}
  		if (!description) {
    		res.send("Please Write a Title.");
  		}
  		if(!tags){
  			res.send("Please add atleast one tag")
  		}
  		else{
    	const newNote = new Note({ 
    		title, 
    		description, 
    		tags 
    	});
    	newNote.user=req.user.user_id;
   		//newNote.user = req.user.id;
    	await newNote.save();
    	return res.status(201).json(newNote);
    	//res.redirect("/notes");
  		}
	}
	catch(err)
	{
		console.log(err);
	}
}
exports.deletenote=async(req,res)=>{
	const id = req.params.id;
	Note.findByIdAndDelete(id)
	.then(data=>{
		if(!data){
			res.send(`The Notes cannot be deleted with id:${id}`)
		}
		else{
			res.send('The note deleted successfully');
		}
	})
	.catch(err=>{
		res.send(err)
		//console.log(err)
	})
}
exports.updatenote=async(req,res)=>{
	const id=req.params.id;
	Note.findByIdAndUpdate(id)
	.then(data=>{
		if(!data){
			res.send(`The Notes cannot be updated with ${id}`)
		}
		else{
			res.send('The Notes Updated successfully')
		}
	})
	.catch(err=>{
		res.send(err)
	})
}
exports.getnote=async(req,res)=>{
	try{
		//user=req.headers['authorization']
		const allnotes=await Note.find({user:req.user.user_id}).exec()
		console.log(req.user)
		
		//console.log(allnotes)
		res.send(allnotes)
	}
	catch(err){
		console.log(err)
	}
}