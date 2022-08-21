const express=require("express");
const route=express.Router()

const controller=require('../controller/user_controller');
//api routes

route.post('/api/new',controller.create)
route.post('/api/login',controller.login)

module.exports=route
