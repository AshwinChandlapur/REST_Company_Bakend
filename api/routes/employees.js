 const express = require('express')
 const router = express.Router();

 var DataLayer = require("../../companydata/index.js")
 

 router.get("/",(req,res,next)=>{
    try{
        var username = req.query.company
        var dl = new DataLayer(username);
        var employees =  JSON.stringify(dl.getAllEmployee(username))
        res.header("Content-Type",'application/json');
        res.status(200).json(employees)
    } catch (err){
        res.header("Content-Type",'application/json');
        res.status(400).json({
            message: err
        })
    }
 })




module.exports = router;