 const express = require('express')
 const router = express.Router();


 var DataLayer = require("../../companydata/index.js")
 
 router.get("/",(req,res,next)=>{
    try{
        var username = req.query.company
        var emp_id = req.query.emp_id

        var dl = new DataLayer(username);
        var employee =  JSON.stringify(dl.getEmployee(emp_id))
        
        
        res.header("Content-Type",'application/json');
        
        if(employee!=="null"){
            res.status(200).json(employee)
        }else{
            res.status(200).json({
                message:'The entered emp_id is Invalid.'
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
        message:'Handling post requests to /employee'
    })
})

module.exports = router;