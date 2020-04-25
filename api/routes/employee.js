 const express = require('express')
 const router = express.Router();


 router.get("/",(req,res,next)=>{
     res.status(200).json({
         message:'Handling GET requests to /employee'
     })
 })


 router.post("/",(req,res,next)=>{
    res.status(200).json({
        message:'Handling post requests to /employee'
    })
})

module.exports = router;