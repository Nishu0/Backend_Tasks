const nodemailer=require('nodemailer');

const transpoter=nodemailer.createTransport({
	service:"Gmail",
	auth:{
	user:process.env.EMAIL,
	pass:process.env.PASS
	},
})
