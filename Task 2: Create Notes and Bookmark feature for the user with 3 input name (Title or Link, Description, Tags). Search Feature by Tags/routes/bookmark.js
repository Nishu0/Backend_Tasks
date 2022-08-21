const express=require("express");
const route=express.Router()

const bookmarkController=require('../controller/bookmark');

route.post("/bookmark/create",bookmarkController.newbookmark)
route.delete('/deleteBookmark/:id',bookmarkController.deletebookmark)
route.put('/updateBookmark/:id',bookmarkController.updatebookmark)
route.get('/allBookmarks',bookmarkController.getbookmark)
route.post('/bookmark/tags',bookmarkController.tagsearch)

module.exports=route

