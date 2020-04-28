const express = require('express')
const router = express.Router();

var DataLayer = require("../../companydata/index.js")


router.get("/",(req,res,next)=>{
   try{
       var company = req.query.company
       var emp_id = req.query.emp_id
       var dl = new DataLayer(company);
       var timecards =  JSON.stringify(dl.getAllTimecard(emp_id))
       res.header("Content-Type",'application/json');
       res.status(200).json(timecards)
   } catch (err){
       res.header("Content-Type",'application/json');
       res.status(400).json({
           message: err
       })
   }
})




module.exports = router;