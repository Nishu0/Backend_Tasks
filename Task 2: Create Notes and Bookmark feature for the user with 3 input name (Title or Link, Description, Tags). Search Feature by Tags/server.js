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
var passportjwt=require('./auth/passport_jwt')
const passport=require('passport')
const session=require('express-session')
const userRoutes=require("./routes/user")
const notesRoutes=require("./routes/note")
const bookmarkRoutes=require("./routes/bookmark")

const app=express()
dotenv.config({path:'config.env'})
app.use(express.json());
const PORT=process.env.PORT || 8000
connectDB();
let jwtSecretKey=process.env.TOKEN_KEY
//user routes
app.post("/api/register",userRoutes)
app.post("/api/login",userRoutes)
app.delete('/deleteUser/:id',passport.authenticate('jwt', { session: false }),userRoutes)
app.put('/updateUser/:id',passport.authenticate('jwt', { session: false }),userRoutes)
app.get('/allUsers',passport.authenticate('jwt', { session: false }),userRoutes)
//notes routes
app.post("/notes/create",passport.authenticate('jwt', { session: false }),notesRoutes)
app.delete('/deleteNote/:id',passport.authenticate('jwt', { session: false }),notesRoutes)
app.put('/updateNote/:id',passport.authenticate('jwt', { session: false }),notesRoutes)
app.get('/allNotes',passport.authenticate('jwt', { session: false }),notesRoutes)
//bookmark notes
app.post("/bookmark/create",passport.authenticate('jwt', { session: false }),bookmarkRoutes)
app.delete('/deleteBookmark/:id',passport.authenticate('jwt', { session: false }),bookmarkRoutes)
app.put('/updateBookmark/:id',passport.authenticate('jwt', { session: false }),bookmarkRoutes)
app.get('/allBookmarks',passport.authenticate('jwt', { session: false }),bookmarkRoutes)
app.post('/bookmark/tags',passport.authenticate('jwt', { session: false }),bookmarkRoutes)
//Port 
app.listen(PORT,()=>{
	console.log(`The port is at ${PORT}`)
})


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
}
*/
/*
app.post('/login',checkNotAuthenticated,passport.authenticate("local", {
  successRedirect: "/jwt",
  failureRedirect: "/login"
}));
*/
