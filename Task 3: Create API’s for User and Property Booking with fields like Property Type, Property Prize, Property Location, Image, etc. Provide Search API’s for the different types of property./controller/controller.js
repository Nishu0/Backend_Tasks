const pool=require('../database/db')
const uuid = require('uuid');
const bcrypt=require('bcryptjs')

const dotenv=require('dotenv')
dotenv.config({path:'config.env'})
const jwt=require('jsonwebtoken')
let jwtSecretKey=process.env.TOKEN_KEY

exports.create=async(req,res)=>{
	const {name,email,password}=req.body;
	if(!name&&email&&password){
		return res.send("The content should not be empty")
	}
	const data=await pool.query(`SELECT *FROM usersdetails where email =$1`,[email]);
	const arr=data.rows
	if(!arr.length==0){
		res.send('The user already exists')
	}
	else{
		encryptedPassword=await bcrypt.hash(password,10)
		const user={
			name,
			email,
			password:encryptedPassword
		};
		await pool.query("insert into usersdetails(uid,name,email,password) values($1,$2,$3,$4) returning *",
			[uuid.v4(),user.name,user.email,user.password],(err,result)=>{
			if(err){
				res.send(err)
			}
			res.send(result.rows)
		})
	}
}
exports.findOne=async(req,res)=>{
	if(!req.params.id){
		res.send("Pls enter id to find specified user")
	}
	else{
		const id=req.params.id;
		await pool.query('SELECT * FROM usersdetails WHERE uid = $1', [id],
			(err,result)=>{
				if(err){
					res.send(err)
				}
				res.status(200).send(JSON.stringify(result.rows))
			}) 
	}
}
exports.find=async(req,res)=>{
		await pool.query(`SELECT * FROM usersdetails`,(err,result)=>{
			if(err){
				res.send(err)
			}
			res.status(200).send(JSON.stringify(result.rows))
		})
}
exports.delete=async(req,res)=>{
	try{
		const {uid}=req.params;
		const deleteUser=await pool.query("delete from usersdetails where uid=$1",
			[uid])
		res.send('The user deleted successfully')
	}
	catch(err){
		console.log(err)
	}
}

exports.update=async(req,res)=>{
	const {uid}=req.params;
	const{name,email}=req.body;
	if(!name){
		res.send('Pls enter something to update')
	}
		await pool.query('UPDATE usersdetails SET name = $1 WHERE uid = $2',[name,uid])
		res.send(`The user's name was update with id:${uid}`)
}

exports.forgot=async(req,res)=>{
	const{email}=req.body;
	const data=await pool.query(`SELECT *FROM usersdetails where email =$1`,[email]);
	const user=data.rows[0]
	if(user.length==0){
		res.send('The user does not exists with this email.')
	}
	console.log(user)
	const secret=jwtSecretKey+user.password
	const payload={
		email,
		id:user.uid
	}
	const passtoken=jwt.sign(payload,secret,{expiresIn:'30m'})
	const link=`http://localhost:3000/api/reset-password/${user.uid}/${passtoken}`
	console.log(link)
	res.send(link)
	//res.send('Password reset link has been sent to the email')
}

//to check the link is valid or not
exports.reset=async(req,res)=>{
	const{uid,passtoken}=req.params
	//res.send(req.params);

	//check if user exists in our database
	const data=await pool.query(`SELECT *FROM usersdetails where uid=$1`,[uid]);
	const userd=data.rows[0]
	if(userd.length==0){
		res.send('The id does not exists in our db')
	}
	//else we have a valid user with id
	const secretReset=jwtSecretKey+userd.password;
	try{
		const payload=jwt.verify(passtoken,secretReset)
		res.send(`Enter password and confirm password for ${userd.email}`)

	}
	catch(err){
		res.send(err)
	}
}

exports.resetpassword=async(req,res)=>{
	const{uid,passtoken}=req.params
	const data=await pool.query(`SELECT *FROM usersdetails where uid=$1`,[uid]);
	const userd=data.rows[0]
	console.log(userd)
	const{newpassword,confirm}=req.body;
	//console.log(`UPDATE usersdetails set password=${newpassword} where uid=${uid}`);
	try{
		if(newpassword==confirm){
		await pool.query(`UPDATE usersdetails set password=$1 where uid=$2`,[newpassword,uid])
		res.send('Reset successfully')
		}
	}
	catch(err){
		console.log(err)
	}
}

exports.user=async(req,res)=>{
	try{
		//const jwtget = await req.headers.authorization.replace('Bearer ', '');
		//console.log(jwtget)
		//const decode=jwt.decode(jwtget)
		//await console.log(decode)
		console.log(req.user.user_id)
	}
	catch(err){
		res.send(err)
	}
}
exports.login=async(req,res)=>
{
	const{email,password}=req.body;
	try{
		const details=await pool.query(`SELECT *FROM usersdetails where email =$1`,[email]);
		const user=details.rows
		console.log(user[0].uid)
		if(user.length==0)
		{
			//return res.send(user[0].password)
			res.send('The user does not exist pls register your account')
		}
		else{
			  await bcrypt.compare(password,user[0].password,(err,result)=>
			  {
				if(err){
					res.send(err)
				}
				else if(result==true){
					let data={
						user_id:user[0].uid
					}
					const token = jwt.sign(data,jwtSecretKey);
					return res.header("auth-token",token).send("Bearer "+token)
					//return res.json({message:"Logged In successfully"});
				}
			else{
					if(result===false){
						return res.json({message:'password is incorrect'});
					}
				}
			})
		}
	}
	catch(err){
		return res.send('Database error was occured while sign in ')
		//res.send(err)
	}
}
