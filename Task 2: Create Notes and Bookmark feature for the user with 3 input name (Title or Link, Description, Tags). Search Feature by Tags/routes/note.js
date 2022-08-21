const express=require("express");
const route=express.Router()

const noteController=require('../controller/note');

route.post("/notes/create",noteController.newnote)
route.delete('/deleteNote/:id',noteController.deletenote)
route.put('/updateNote/:id',noteController.updatenote)
route.get('/allNotes',noteController.getnote)

module.exports=route
