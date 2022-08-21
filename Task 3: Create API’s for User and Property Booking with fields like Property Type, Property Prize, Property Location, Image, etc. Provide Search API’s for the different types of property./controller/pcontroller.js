const pool=require('../database/db')
const uuid = require('uuid');
// const multer = require('multer');

// const fileStorageEngine = multer.diskStorage({
//     destination:(req,file,cb)=>{
//     	cb(null,"./images")
//     },
//     filename:(req,file,cb)=>{
//     	cb(null,Date.now()+"--"+file.originalname);
//     },
// });

// const upload=multer({ storage:fileStorageEngine });

exports.find=async(req,res)=>{
	try{
		await pool.query('SELECT *from property',(err,result)=>{
		if(err){
			res.send(err)
		}
		//console.log('Details')
		res.send(result.rows)
		})
	}
	catch(err){
		res.send(err)
		console.log(err)
	}
	
}

exports.image=async(req,res)=>{
	console.log(req.file);
	res.send("Single file upload successfully")
}

exports.create=async(req,res)=>{
	const{address, city, state, rent, area, type, garage, bedrooms, nbhk, basement, imagepath, zip, bathroom }=req.body
	//console.log(userid)
	const path=req.file.path
	const userdet=req.user.user_id
	console.log(userdet)
	if(!address&&city&&state&&rent&&area&&type&&garage&&bedrooms&&nbhk&&basement&&imagepath&&zip&&bathroom){
		res.send("Pls enter all details to add property")
	}
	else{
		//var user=await req.user.user_id
		//console.log(userid)
		await pool.query("insert into property(pid, address, city, state, rent, area, type, garage, bedrooms, nbhk, basement, image, zip, bathroom,uid) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) returning *",
			[uuid.v4(), address, city, state, rent, area, type, garage,bedrooms, nbhk, basement, path, zip, bathroom,userdet],(err,result)=>{
				if(err){
					res.send(err)
					console.log(err)
				}
				res.send(result.rows)
			})
	}
}
exports.remove=async(req,res)=>{
	try{
		const {pid}=req.params;
		const deleteUser=await pool.query("delete from property where pid=$1",
			[pid])
		res.send('The user deleted successfully')
	}
	catch(err){
		console.log(err)
	}
}

exports.user=async(req,res)=>{
	try{
		/*
		await pool.query(`SELECT * FROM usersdetails`,(err,result)=>{
			if(err){
				res.send(err)
			}
			res.status(200).send(JSON.stringify(result.rows))
		})*/
		console.log(req.user.user_id)
	}
	catch(err){
		console.log(err)
	}
}
exports.search=async(req,res)=>{
	const{state,city,pricemax,pricemin,nbhk,type,bedrooms,price}=req.body;
	try{
		if(state){
			await pool.query(`SELECT * FROM property where state=$1`,[state],(err,result)=>{
			if(err){
				res.send(err)
			}
			res.send(result.rows)
			})
		}
		else if(city){
			await pool.query(`SELECT * FROM property where city=$1`,[city],(err,result)=>{
			if(err){
				res.send(err)
			}
			res.send(result.rows)
			})
		}
		else if(nbhk){
			await pool.query(`SELECT * FROM property where nbhk=$1`,[nbhk],(err,result)=>{
			if(err){
				res.send(err)
			}
			res.send(result.rows)
			})
		}
		else if(type){
			await pool.query(`SELECT * FROM property where type=$1`,[type],(err,result)=>{
			if(err){
				res.send(err)
			}
			res.send(result.rows)
			})
		}
		else if(pricemin){
			await pool.query(`SELECT * FROM property where rent between $1 and $2`,[pricemin,pricemax],(err,result)=>{
			if(err){
				res.send(err)
			}
			res.send(result.rows)
			})
		}
	}
	catch(err){
		res.send(err)
	}
}