const jwt=require('jsonwebtoken');

const config=process.env;const verifyToken=(req,res,next)=>{
	const token=req.header("auth-token");
	if(!token){
		return res.status(401).send("Access Denied")
	}
	try{
		const verified=jwt.verify(token,process.env.TOKEN_KEY)
		req.user=verified;
		next();
	}

	catch(err)
	{
		res.send("Invalid Token Pls enter new token")
		console.log("Invalid Token")
	}

}

module.exports=verifyToken