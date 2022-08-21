const express=require('express')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User=require("./models/user")
const Note=require("./models/notes")
const Bookmark=require("./models/bookmark")
const connectDB=require("./db/connection");
const auth=require("./middleware/auth");
var path = require('path');



const app=express()
dotenv.config({path:'config.env'})
app.use(express.json());
const PORT=process.env.PORT || 8000
connectDB();
//session and passport
const passport=require('passport')
const session=require('express-session')
app.use(session({
	secret:process.env.SESSION_SECRET,
	resave:false,
	saveUninitialized:false
}))

app.use(passport.initialize());
app.use(passport.session());
require('./passport-config');
/*
function checkAuthenticated(req,res,next) {
	if(req.isAuthenticated()){
		return next() 
	}
	res.redirect('/login')
}
function checkNotAuthenticated(req,res,next) {
	if(req.isAuthenticated()){
		return res.redirect('/')
	}
	next() 
}*/
//jwt token
let jwtSecretKey=process.env.TOKEN_KEY

app.get("/",checkAuthenticated,(req,res)=>{
	res.send("Welcome to home page");
})

app.post("/register",async(req,res)=>{
	try{
		const {name,email,password}=req.body;
		if(!(email&&password&&name)){
			return res.status(400).send("All field is require");
		}
		const oldUser=await User.findOne({email});
		if(oldUser){
			return res.status(401).send("User already exists");
		}
		if(password.length < 8){
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 8 characters'
			})
		}
		encryptedPassword=await bcrypt.hash(password,10);

		const user=await User.create({
			name,
			email:email.toLowerCase(),
			password: encryptedPassword
		});
		let data={
			user_id: user._id, email 
		}
    	const token = jwt.sign(data,jwtSecretKey);
    	// save user token
    	user.token = token;
		//res.status(201).json(user);
		res.json({data: token })
	}
	catch(err){
		console.log(err);
	}
})

app.get('/login',(req,res)=>{
	res.send("Please login to see the contents")
})

app.post('/login',checkNotAuthenticated,passport.authenticate("local", {
  successRedirect: "/allNotes",
  failureRedirect: "/login"
}));

/*
app.post('/login',async(req,res)=>{
	try{
		const{email,password}=req.body;
		if(!(email&&password)){
			return res.status(400).send("Email and Password both are required")
		}
		const user=await User.findOne({email});
		if(user&&(await bcrypt.compare(password,user.password))){
			let data={
				user_id: user._id, email 
			}
			const token = jwt.sign(data,jwtSecretKey);
      		user.token=token;
      		//return res.json({status:'ok',data:token})
      		return res.header("auth-token",token).send(token)
      		//let url=`http://localhost:8000/verify/${token}`

		}
		res.status(400).send("Invalid Credentials")
	}
	catch(err)
	{
		console.log(err);
	}
})
*/
app.delete('/deleteUser/:id',checkAuthenticated,async(req,res)=>{
	const id=req.params.id;
	User.findByIdAndDelete(id)
	.then(data=>{
		if(!data){
			res.send(`cannot delete with {$id}`)
		}
		else{
			res.send("User was deleted successfully")
		}
	})
	.catch(err=>{
		res.send("Could not delete User with id="+id);
	});
})
app.put('/updateUser/:id',checkAuthenticated,async(req,res)=>{
	if(!req.body){
		return res.status(400).send("Data to update cannot be empty");
	}
	const id=req.params.id;
	User.findByIdAndUpdate(id,req.body)
	.then(data=>{
		if(!data){
			res.status(404).send(`Cannot Update with ${id}`)
		}
		else{
			res.send(`User updated successfully`)
		}
	})
	.catch(err=>{
		res.status(500).send("Error Update user Information");
	});
})
app.get('/allUsers',checkAuthenticated,async(req,res)=>{
	try{
		//exec is part of mongoose API it returns promise
		const allusers=await User.find().exec();
		//console.log(results);
		res.send(allusers)
	}
	catch(err)
	{
		//res.send(err);
		console.log(err)
	}
})

app.post("/notes/create",checkAuthenticated,async(req,res)=>{
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
})
app.delete('/deleteNote/:id',checkAuthenticated,async(req,res)=>{
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
})

app.put('/updateNote/:id',checkAuthenticated,(req,res)=>{
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
})
app.get('/allNotes',checkAuthenticated,async(req,res)=>{
	try{
		const allnotes=await Note.find().exec()
		res.send(allnotes)
	}
	catch(err){
		console.log(err)
	}
})
app.post("/bookmark/create",checkAuthenticated,async(req,res)=>{
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
		await newBookmark.save();
    	res.status(201).json(newBookmark);
		}
	}
	catch(err){
		console.log(err)
	}
})
app.delete('/deleteBookmark/:id',checkAuthenticated,(req,res)=>{
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
})
app.put('/updateBookmark/:id',checkAuthenticated,(req,res)=>{
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
})
app.get('/allBookmarks',checkAuthenticated,async(req,res)=>{
	try{
		const allbookmarks=await Bookmark.find().exec()
		res.send(allbookmarks)
	}
	catch(err){
		console.log(err)
	}
})
function checkAuthenticated(req,res,next) {
	if(req.isAuthenticated()){
		return next() 
	}
	res.redirect('/login')
}
function checkNotAuthenticated(req,res,next) {
	if(req.isAuthenticated()){
		return res.redirect('/')
	}
	next() 
}

app.listen(PORT,()=>{
	console.log(`The port is at ${PORT}`)
})


