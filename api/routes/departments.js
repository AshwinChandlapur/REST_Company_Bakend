 const express = require('express')
 const router = express.Router()
 
 
 var DataLayer = require("../../companydata/index.js")

 router.get("/",(req,res,next)=>{
    try{
        var company = req.query.company
        var dl = new DataLayer(company);
        var departments =  JSON.stringify(dl.getAllDepartment(company))
        res.header("Content-Type",'application/json');
        res.status(200).json(departments)
    } catch (err){
        res.header("Content-Type",'application/json');
        res.status(400).json({
            message: err
        })
    }
 })


module.exports = router;