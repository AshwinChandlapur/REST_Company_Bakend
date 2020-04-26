const express = require('express')
const router = express.Router();


var DataLayer = require("../../companydata/index.js")
 
 router.get("/",(req,res,next)=>{
    try{
        var username = req.query.company
        var dept_id = req.query.dept_id
        var dl = new DataLayer(username);
        var department =  JSON.stringify(dl.getDepartment(username,dept_id))
        res.header("Content-Type",'application/json');
        if(department!=="null"){
            res.status(200).json(department)
        }else{
            res.status(200).json({
                message:'The entered dept_id is Invalid.'
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
        message:'Handling Post requests to /department'
    })
})

module.exports = router;