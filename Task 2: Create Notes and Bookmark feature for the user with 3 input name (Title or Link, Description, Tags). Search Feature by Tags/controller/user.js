const User=require("../models/user")
const bcrypt=require('bcryptjs')
const dotenv=require("dotenv");
dotenv.config({path:'config.env'})
const jwt = require('jsonwebtoken')
let jwtSecretKey=process.env.TOKEN_KEY

exports.create=async(req,res)=>{
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
}

exports.login=async(req,res)=>{
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

		}
		res.status(400).send("Invalid Credentials")
	}
	catch(err)
	{
		console.log(err);
	}
}
exports.deleteuser=async(req,res)=>{
	const id=req.params.id;
	User.findByIdAndDelete(id)
	.then(data=>{
		if(!data){
			res.send({message:`cannot delete with {$id}`})
		}
		else{
			res.send({
				message:"User was deleted successfully"
			})
		}
	})
	.catch(err=>{
		res.send({message:"Could not delete User with id="+id});
	});
}
exports.updateuser=async(req,res)=>{
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
}
exports.printuser=async(req,res)=>{
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
}