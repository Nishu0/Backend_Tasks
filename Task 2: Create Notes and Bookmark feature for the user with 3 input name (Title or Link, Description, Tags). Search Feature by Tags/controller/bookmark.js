const Bookmark=require("../models/bookmark")
exports.newbookmark=async(req,res)=>{
	try{
		const {link,title,tags} = req.body;
		if(!link){
			res.send("Link/Url is required to bookmark")
		}
		if(!title){
			res.send("Small Title is required")
		}
		if(!tags){
			res.send("Atleast one tag is required")
		}
		else{
			const newBookmark=new Bookmark({
				link,
				title,
				tags
			})
		newBookmark.user=req.user.user_id;
		await newBookmark.save();
    	res.status(201).json(newBookmark);
		}
	}
	catch(err){
		console.log(err)
	}
}
exports.deletebookmark=async(req,res)=>{
	const id=req.params.id;
	Bookmark.findByIdAndDelete(id)
	.then(data=>{
		if(!data){
			res.send(`The Bookmark cannot be deleted with ${id}`)
		}
		else{
			res.send('The Bookmark is deleted')
		}
	})
	.catch(err=>{
		console.log(err);
	})
}
exports.updatebookmark=async(req,res)=>{
	if(!req.body){
		return res.send("Data Cannot be empty")
	}
	const id=req.params.id;
	Bookmark.findByIdAndUpdate(id,req.body)
	.then(data=>{
		if(!data){
			res.send(`User Cannot be Updated with ${id}`)
		}
		else{
			res.send('The Bookmark Updated successfully')
		}
	})
	.catch(err=>{
		res.send(err)
	})
}
exports.getbookmark=async(req,res)=>{
	try{
		const tag=req.body.tag
		const allbookmarks=await Bookmark.find({tags:tag}).exec()
		res.send(allbookmarks)
		
	}
	catch(err){
		console.log(err)
	}
}
exports.tagsearch=async(req,res)=>{
	try{
		const tag=req.body.tag
		const allbookmarks=await Bookmark.find({tags:tag}).exec()
		res.send(allbookmarks)
		
	}
	catch(err){
		console.log(err)
	}
}