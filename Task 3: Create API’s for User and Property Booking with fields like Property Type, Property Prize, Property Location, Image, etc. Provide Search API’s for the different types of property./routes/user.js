const express=require("express");
const route=express.Router()

const controller=require('../controller/controller');
//api routes

route.post('/api/adduser',controller.create)
route.get('/api/alluser',controller.find)
route.get('/api/user/:id',controller.findOne)
route.put('/api/updateuser/:uid',controller.update)
route.delete('/api/deleteuser/:uid',controller.delete)
route.post('/api/login',controller.login)

route.get('/api/reset-password/:uid/:passtoken',controller.reset)
route.post('/api/reset-password/:uid/:passtoken',controller.resetpassword)
route.post('/api/forgot',controller.forgot)

route.get('/api/user',controller.user)
module.exports=route