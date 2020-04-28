const express = require('express')
const router = express.Router();
const business = require("../../business/validations.js")
var DataLayer = require("../../companydata/index.js")

router.put("/",(req,res,next)=>{
    
    try{
        var company = req.body.company
        var dept_id = req.body.dept_id
        var dl = new DataLayer(company);
        
        var defaults = dl.getDepartment(company,dept_id)
        var dept_name = req.body.dept_name || defaults.dept_name
        var dept_no = req.body.dept_no || defaults.dept_no
        var location =  req.body.location || defaults.location
        
    
        
        var departments = dl.getAllDepartment(company)
        

        if(business.dept_id_exists(departments,dept_id)){
            if(business.dept_id_no_unique(departments,dept_id,dept_no)==true){
                var department = dl.getDepartment(company,dept_id)
                department.setLocation(location)
                department.setDeptNo(dept_no)
                department.setDeptName(dept_name)
                var department1 = dl.updateDepartment(department)
                res.status(200).json({
                    success: JSON.stringify(department1)
                })
            }else{
                res.status(200).json({
                error: "Duplicate Entry for Dept_no Found , Cannot Update."
            })
            }   
        }else{
            console.log("Bad")
            res.status(200).json({
                error: "Dept_id does not exist, Cannot Update."
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



 
 router.get("/",(req,res,next)=>{
    try{
        var company = req.query.company
        var dept_id = req.query.dept_id
        var dl = new DataLayer(company);
        var department =  JSON.stringify(dl.getDepartment(company,dept_id))
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
    try{
        var company = req.body.company
        var dept_name = req.body.dept_name
        var dept_no = req.body.dept_no
        var location =  req.body.location
        
    
        var dl = new DataLayer(company);
        var departments =  dl.getAllDepartment(company)
        
        if(business.dept_no_exists(departments,dept_no)==false){
            var department = new dl.Department(company,dept_name,dept_no,location)
            var department1 = dl.insertDepartment(department)
            res.status(200).json({
                message: JSON.stringify(department1)
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