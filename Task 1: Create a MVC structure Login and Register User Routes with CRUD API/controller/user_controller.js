const bcrypt=require('bcryptjs')
const dotenv=require("dotenv");
dotenv.config({path:'config.env'})
const User = require("../model/user");
const jwt = require('jsonwebtoken')
let jwtSecretKey=process.env.TOKEN_KEY
exports.create=async(req,res)=>{
	try{
		const {name,email,password,address,age}=req.body;
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
			password: encryptedPassword,
			address,
			age
		});
		 // Create token
    	const token = jwt.sign(
    	{ 
    		user_id: user._id, email 
    	},
      	process.env.TOKEN_KEY,
      	{
        	expiresIn: "2h",
      	});
    	// save user token
    	user.token = token;
		res.status(201).json(user);
		//res.json({data: token })
	}
	catch(err){
		console.log(err);
	}
}
exports.login=async(req,res)=>
{
	try{
		const{email,password}=req.body;
		if(!(email&&password)){
			return res.status(400).send("Email and password both required")
		}
		const user=await User.findOne({email});
		if(user && (await bcrypt.compare(password,user.password))){
			//create jwt token
			const token = jwt.sign(
        	{ 
        		user_id: user._id, email 
        	},
        	process.env.TOKEN_KEY,
        	{
          		expiresIn: "5h",
        	}
      		);
			// save user token
      		user.token = token;
			//return res.status(200).json(user);
			return res.json({ status: 'ok', data: token })
		}
		res.status(400).send("Invalid Credentials");
	}
	catch(err){
		console.log(err);
	}
}