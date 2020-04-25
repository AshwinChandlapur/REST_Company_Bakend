 const express = require('express')
 const router = express.Router(); 


 router.get("/",(req,res,next)=>{
     res.status(200).json({
         message:'Handling GET requests to /departments'
     })
 })

 router.post("/",(req,res,next)=>{
    res.status(200).json({
        message:'Handling post requests to /departments'
    })
})

module.exports = router;