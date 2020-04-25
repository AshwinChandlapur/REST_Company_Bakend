 const express = require('express')
 const router = express.Router();


 router.get("/",(req,res,next)=>{
     res.status(200).json({
         message:'Handling GET requests to /timecards'
     })
 })


 router.post("/",(req,res,next)=>{
    res.status(200).json({
        message:'Handling post requests to /timecards'
    })
})

module.exports = router;