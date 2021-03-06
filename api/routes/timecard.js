 const express = require('express')
 const router = express.Router();
 const moment = require('moment')
 const business = require("../../business/validations.js")
 var DataLayer = require("../../companydata/index.js")
 
 router.get("/",(req,res,next)=>{
    try{
        var company = req.query.company
        var timecard_id = req.query.timecard_id
        var dl = new DataLayer(company);
        var timecard =  JSON.stringify(dl.getTimecard(timecard_id))
        res.header("Content-Type",'application/json');
        res.status(200).json(timecard)
    } catch (err){
        res.header("Content-Type",'application/json');
        res.status(400).json({
            message: err
        })
    }
 })

 router.post("/",(req,res,next)=>{
    try{
        var company = req.body.company
        var emp_id = req.body.emp_id
        var start_time = req.body.start_time
        var end_time = req.body.end_time
        
        var dl = new DataLayer(company);
        var employees = dl.getAllEmployee(company)
        
        if(business.emp_id_exists(employees,emp_id)){
            if(business.difference(start_time,end_time)>0){
                var s = moment(start_time,"YYYY/MM/DD hh:mm:ss").weekday()
                var e = moment(end_time,"YYYY/MM/DD hh:mm:ss").weekday()
                if(s>0 && s<=5 && e>0 && e<=5){
                    var timecard = new dl.Timecard(start_time,end_time,emp_id)
                    var timecard1 = dl.insertTimecard(timecard)
                    res.status(200).json({
                        success: JSON.stringify(timecard1)
                    })
                }else{
                    res.status(200).json({
                        message: "Start Time or End Time is on a weekend."
                    })
                }
            }else{
                res.status(200).json({
                    message: "Difference between start Time and End time is less than an hour."
                })
            } 
        }else{
            res.status(200).json({
                message: "Emp_Id Does not Exist."
            })
        }
    
    }catch(err){
        console.log(err)
        res.status(400).json({
            message:err
        })
    }
})



router.put("/",(req,res,next)=>{
    try{
        var company = req.body.company
        var timecard_id = req.body.timecard_id
        var dl = new DataLayer(company);
        var defaults = dl.getTimecard(timecard_id)
        

        var emp_id = req.body.emp_id || defaults.emp_id
        var start_time = req.body.start_time || defaults.start_time
        var end_time = req.body.end_time || defaults.end_time
        
        var timecard = dl.getTimecard(timecard_id)
        var employees  = dl.getAllEmployee(company)

        if(business.emp_id_exists(employees,emp_id)){
            if(business.difference(start_time,end_time)>0){
                var s = moment(start_time,"YYYY/MM/DD hh:mm:ss").weekday()
                var e = moment(end_time,"YYYY/MM/DD hh:mm:ss").weekday()
                if(s>0 && s<=5 && e>0 && e<=5){
                    var timecards = dl.getAllTimecard(emp_id)
                    if(business.timecard_id_exists(timecards,timecard_id)){
                        timecard.setStartTime(start_time)
                        timecard.setEndTime(end_time)
                        var timecard1 = dl.updateTimecard(timecard)
                        res.status(200).json({
                            success: JSON.stringify(timecard1)
                        })
                    }else{
                        res.status(200).json({
                            message: "Time card Id does not exist."
                        })
                    }
                }else{
                    res.status(200).json({
                        message: "Start Time or End Time is on a weekend."
                    })
                }
            }else{
                res.status(200).json({
                    message: "Difference between start Time and End time is less than an hour."
                })
            } 
        }else{
            res.status(200).json({
                message: "Emp_Id Does not Exist."
            })
        }

        
        
    }catch(err){
        console.log(err)
        res.header("Content-Type",'application/json');
        res.status(400).json({
            error: err
        })
    }

})


router.delete("/",(req,res,next)=>{
    try{
        var company = req.query.company
        var timecard_id = req.query.timecard_id
        var dl = new DataLayer(company);
        
        var status =  dl.deleteTimecard(timecard_id);
        if(status>0){
            res.header("Content-Type",'application/json');
            res.status(200).json({
                success: "Timecard " + timecard_id+ " succesfully deleted"
            })
        }else{
            res.status(200).json({
                message:'Unable to delete Timecard. The entered timecard_id is Invalid.'
            })
        }
        
    } catch (err){
        res.header("Content-Type",'application/json');
        res.status(400).json({
            message: err
        })
    }
 })

module.exports = router;