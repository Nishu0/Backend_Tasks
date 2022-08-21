const express=require("express");
const route=express.Router()

const pcontroller=require('../controller/pcontroller');
//api routes

route.get('/api/allproperties',pcontroller.find)
route.post('/api/addproperties',pcontroller.create)
route.delete('/api/deleteproperty/:pid',pcontroller.remove)
route.get('/api/userdetails',pcontroller.user)

route.post('/api/search',pcontroller.search)
//route.post('/api/upload',pcontroller.uploadfile)
module.exports=route