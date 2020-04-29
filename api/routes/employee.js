 const express = require('express')
 const router = express.Router();
 
 const business = require("../../business/validations.js")
 var DataLayer = require("../../companydata/index.js")

 
 router.get("/",(req,res,next)=>{
    try{
        var company = req.query.company
        var emp_id = req.query.emp_id

        var dl = new DataLayer(company);
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
    try{
        var company = req.body.company
        var emp_name = req.body.emp_name
        var emp_no = req.body.emp_no
        var hire_date = req.body.hire_date
        var job = req.body.job
        var salary = req.body.salary
        var dept_id = req.body.dept_id
        var mng_id = req.body.mng_id || 0
        

        const year = hire_date.split('-')[0]
        const month = hire_date.split('-')[1]
        const day = hire_date.split('-')[2]
        const monthIndex = month -1
        const hire = new Date(year,monthIndex,day)
        
        var dl = new DataLayer(company);
        var departments =  dl.getAllDepartment(company)
        var employees = dl.getAllEmployee(company)
        
        if(business.dept_id_exists(departments,dept_id)==true){
            if(business.find_key_value_count("emp_no",emp_no,JSON.stringify(employees))==0){
                if(business.isFutureDate(hire)==false){
                    if(hire.getDay()>0 && hire.getDay()<=5){
                        var employee = new dl.Employee(emp_name,emp_no,hire.toDateString(),job,salary,dept_id,mng_id)
                        var employee1 = dl.insertEmployee(employee)
                        res.status(200).json({
                            success: JSON.stringify(employee1)
                        })
                    }else{
                        res.status(200).json({
                            message: "Hire_Date is a weekend."
                        })
                    }
                }else{
                    res.status(200).json({
                        message: "Hire_Date is in Future"
                    })
                }
            }else{
                res.status(200).json({
                    message: "Emp_no already exists"
                })
            }
        }else{
            res.status(200).json({
                message: "Dept_id does not exist."
            })
        }
    }catch(err){
        console.log(err)
        res.header("Content-Type",'application/json');
        res.status(400).json({
            message: err
        })
    }
})


router.put("/",(req,res,next)=>{
    
    try{
        var company = req.body.company
        var emp_id = req.body.emp_id
        var dl = new DataLayer(company);
        var defaults = dl.getEmployee(emp_id)
        

        var emp_name = req.body.emp_name || defaults.emp_name
        var emp_no = req.body.emp_no || defaults.emp_no
        var hire_date =  req.body.hire_date || defaults.hire_date
        var job =  req.body.job || defaults.job
        var salary =  req.body.salary || defaults.salary
        var dept_id =  req.body.dept_id || defaults.dept_id
        var mng_id =  req.body.mng_id || defaults.mng_id
        
        if(typeof hire_date == 'string'){
            const year = hire_date.split('-')[0]
            const month = hire_date.split('-')[1]
            const day = hire_date.split('-')[2]
            const monthIndex = month -1
            hire_date = new Date(year,monthIndex,day)
        }
        var employees  = dl.getAllEmployee(company)
        var employee = dl.getEmployee(emp_id)
        var departments = dl.getAllDepartment(company)
        if(business.emp_id_exists(employees,emp_id)){
            if(business.dept_id_exists(departments,dept_id)==true){
                if(business.isFutureDate(hire_date)==false){
                    if(hire_date.getDay()>0 && hire_date.getDay()<=5){
                        employee.setEmpName(emp_name)
                        employee.setEmpNo(emp_no)
                        employee.setHireDate(hire_date.toDateString())
                        employee.setJob(job)
                        employee.setSalary(salary)
                        employee.setDeptId(dept_id)
                        employee.setMngId(mng_id)
                        
                        var employee1 = dl.updateEmployee(employee)
                        res.status(200).json({
                            success: JSON.stringify(employee1)
                        })
                    }else{
                        res.status(200).json({
                            message: "Hire_Date is a weekend."
                        })
                    }
                }else{
                    res.status(200).json({
                        message: "Hire_Date is in Future"
                    })
                }    
        }else{
            res.status(200).json({
                message: "Dept_id does not exist."
            })
        }
        }else{
            res.status(200).json({
                message: "Emp_id does not exist."
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
        var emp_id = req.query.emp_id
        var dl = new DataLayer(company);
        
        var timecards =  dl.getAllTimecard(emp_id)
        for(var i=0;i<timecards.length;++i){
            var timecard_id = timecards[i].timecard_id
            dl.deleteTimecard(timecard_id)
        }

        var status =  dl.deleteEmployee(emp_id);
        if(status>0){
            res.header("Content-Type",'application/json');
            res.status(200).json({
                success: "Employee " + emp_id+ " succesfully deleted"
            })
        }else{
            res.status(200).json({
                message:'Unable to delete Employee. The entered emp_id is Invalid.'
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