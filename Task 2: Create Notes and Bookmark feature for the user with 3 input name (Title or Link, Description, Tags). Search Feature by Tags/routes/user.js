const express=require("express");
const route=express.Router()

const controller=require('../controller/user');
//api routes

route.post('/api/register',controller.create)
route.post('/api/login',controller.login)
route.delete('/deleteUser/:id',controller.deleteuser)
route.put('/updateUser/:id',controller.updateuser)
route.get('/allUsers',controller.printuser)

module.exports=route