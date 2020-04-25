const express = require('express')
const router = express.Router();


 router.get("/",(req,res,next)=>{
     res.status(200).json({
         message:'Handling GET requests to /department'
     })
 })


 router.post("/",(req,res,next)=>{
    res.status(200).json({
        message:'Handling Post requests to /department'
    })
})

module.exports = router;