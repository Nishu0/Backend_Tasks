const express=require('express')
const app=express();

const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config({path:'config.env'})

app.use(express.json())
const pool=('./database/db')
const userRoutes=require('./routes/user')

const propertyRoutes=require('./routes/property')

var passportjwt=require('./auth/passport_jwt')
const passport=require('passport')

const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
    destination:(req,file,cb)=>{
    	cb(null,"./images")
    },
    filename:(req,file,cb)=>{
    	cb(null,Date.now()+"--"+file.originalname);
    },
});

const upload=multer({ storage:fileStorageEngine });

app.get('/api/alluser',passport.authenticate('jwt', { session: false }),userRoutes)
app.get('/api/user/:id',passport.authenticate('jwt', { session: false }),userRoutes)
app.post('/api/adduser',passport.authenticate('jwt', { session: false }),userRoutes)
app.delete('/api/deleteuser/:uid',passport.authenticate('jwt', { session: false }),userRoutes)
app.put('/api/updateuser/:uid',passport.authenticate('jwt', { session: false }),userRoutes)
app.post('/api/login',userRoutes)
app.get('/api/user',passport.authenticate('jwt', { session: false }),userRoutes)

app.post('/api/forgot',userRoutes)
app.get('/api/reset-password/:uid/:passtoken',userRoutes)
app.post('/api/reset-password/:uid/:passtoken',userRoutes)


app.get('/api/allproperties',propertyRoutes)
app.post('/api/addproperties',upload.single('image'),passport.authenticate('jwt', { session: false }),propertyRoutes)
app.delete('/api/deleteproperty/:pid',propertyRoutes)
app.get('/api/userdetails',passport.authenticate('jwt', { session: false }),propertyRoutes)
app.post('/api/search',passport.authenticate('jwt', { session: false }),propertyRoutes)
//app.post('/api/upload',propertyRoutes)

app.post("/api/single",upload.single('image'),(req,res)=>{
	const path=req.file.path
	console.log(req.file.path);
	res.send("Single file upload successfully")
})

app.listen(3000,()=>{
	console.log(`The Port is at 3000`)
})
