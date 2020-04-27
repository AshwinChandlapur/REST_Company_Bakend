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
        
        const [year,month,day] = [...hire_date.split('-')]
        const monthIndex = month -1
        const hire = new Date(year,monthIndex,day)

        var dl = new DataLayer(company);
        var departments =  dl.getAllDepartment(company)
        
        if(business.dept_id_exists(departments,dept_id)==true){
            var employee = new dl.Employee(emp_name,emp_no,hire,job,salary,dept_id,mng_id)
            var employee1 = dl.insertEmployee(employee)
            console.log(employee1)
            res.status(200).json({
                message: JSON.stringify(employee1)
            })
        }else{
            res.status(200).json({
                message: "Duplicate Entry Found, Cannot Insert."
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


module.exports = router;