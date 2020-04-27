 const express = require('express')
 const router = express.Router();

 router.get("/",(req,res,next)=>{
    try{
        var username = req.query.company
        
        var emp_id = parseInt(req.query.emp_id, 10) 
        
        var dl = new DataLayer(username);
        var timecard =  JSON.stringify(dl.getAllTimecard(emp_id))
        
        res.header("Content-Type",'application/json');
        
        if(timecard!=="null"){
            res.status(200).json(timecard)
        }else{
            res.status(200).json({
                message:'The entered timecard_id is Invalid.'
            })
        }
    } catch (err){
        res.header("Content-Type",'application/json');
        res.status(400).json({
            message: err
        })
    }
 })

 router.post("/",(req,res,next)=>{
    res.status(200).json({
        message:'Handling post requests to /timecards'
    })
})

module.exports = router;