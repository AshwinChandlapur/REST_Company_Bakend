 const express = require('express')
 const router = express.Router();


 var DataLayer = require("../../companydata/index.js")
 
 router.get("/",(req,res,next)=>{
    try{
        var username = req.query.company
        var time_card_id = parseInt(req.query.timecard_id, 10) 
        var dl = new DataLayer(username);
        var timecard =  JSON.stringify(dl.getTimecard(time_card_id))
        console.log(timecard)
        
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
        message:'Handling post requests to /timecard'
    })
})

module.exports = router;