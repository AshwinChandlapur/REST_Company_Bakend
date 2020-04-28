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
        
        var t1 = start_time.split(/[- \s+ :]/);
        var d1 = new Date(Date.UTC(t1[0], t1[1]-1, t1[2], t1[3], t1[4], t1[5]))
       
        var t2 = end_time.split(/[- \s+ :]/);
        var d2 = new Date(Date.UTC(t2[0], t2[1]-1, t2[2], t2[3], t2[4], t2[5]))
        
        var time1 = moment(start_time, "YYYY/MM/DD hh:mm:ss")
        var time2 = moment(end_time, "YYYY/MM/DD hh:mm:ss")
        difference = time2.diff(time1,"hours")

        var dl = new DataLayer(company);
        var employees = dl.getAllEmployee(company)
        
        if(business.emp_id_exists(employees,emp_id)){
            if(difference>0){
                var s = moment(start_time,"YYYY/MM/DD hh:mm:ss").weekday()
                var e = moment(end_time,"YYYY/MM/DD hh:mm:ss").weekday()
                if(s>0 && s<=5 && e>0 && e<=5){
                    var timecard = new dl.Timecard(d1.toDateString(),d2.toDateString(),emp_id)
                    var timecard1 = dl.insertTimecard(timecard)
                    res.status(200).json({
                        success: JSON.stringify(timecard1)
                    })
                }else{
                    res.status(200).json({
                        message: "Start Time is on a weekend."
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
        console.log(JSON.stringify(defaults))

        var emp_id = req.body.emp_id || defaults.emp_id
        var start_time = req.body.start_time || defaults.start_time
        var end_time = req.body.end_time || defaults.end_time
        
        var timecard = dl.getTimecard(timecard_id)
        timecard.set



        
        // var employees  = dl.getAllEmployee(company)
        // var employee = dl.getEmployee(emp_id)
        // var departments = dl.getAllDepartment(company)
        // if(business.emp_id_exists(employees,emp_id)){
        //     if(business.dept_id_exists(departments,dept_id)==true){
        //         if(business.isFutureDate(hire_date)==false){
        //             if(hire_date.getDay()>0 && hire_date.getDay()<=5){
        //                 employee.setEmpName(emp_name)
        //                 employee.setEmpNo(emp_no)
        //                 employee.setHireDate(hire_date.toDateString())
        //                 employee.setJob(job)
        //                 employee.setSalary(salary)
        //                 employee.setDeptId(dept_id)
        //                 employee.setMngId(mng_id)
                        
        //                 var employee1 = dl.updateEmployee(employee)
        //                 res.status(200).json({
        //                     success: JSON.stringify(employee1)
        //                 })
        //             }else{
        //                 res.status(200).json({
        //                     message: "Hire_Date is a weekend."
        //                 })
        //             }
        //         }else{
        //             res.status(200).json({
        //                 message: "Hire_Date is in Future"
        //             })
        //         }    
        // }else{
        //     res.status(200).json({
        //         message: "Dept_id does not exist."
        //     })
        // }
        // }else{
        //     res.status(200).json({
        //         message: "Emp_id does not exist."
        //     })
        // }
        
        

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