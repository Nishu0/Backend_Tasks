const express=require("express");
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const User=require("./model/user")
const connectDB=require("./database/connection");
const userRoutes=require("./routes/user_routes")
const bcrypt=require("bcryptjs")
const jwt = require('jsonwebtoken')

const app=express();
app.use(express.json());
dotenv.config({path:'config.env'})
const PORT=process.env.PORT||8080

connectDB();

app.post("/api/register",userRoutes);
app.post("/api/login",userRoutes)
app.get("/",(req,res)=>{
	res.status(200).send("Welcome");
});

app.listen(PORT,()=>{
	console.log(`The port is on ${PORT}`);
});
