 const express = require('express')
 const router = express.Router();


 router.get("/",(req,res,next)=>{
     res.status(200).json({
         message:'Handling GET requests to /timecard'
     })
 })


 router.post("/",(req,res,next)=>{
    res.status(200).json({
        message:'Handling post requests to /timecard'
    })
})

module.exports = router;