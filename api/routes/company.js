 const express = require('express')
 const router = express.Router(); 
 
 router.delete("/",(req,res,next)=>{
    try{
        var company = req.query.company
        var dl = new DataLayer(company);
        var alldepartments = dl.getAllDepartment(company)

        var employees =  dl.getAllEmployee(company)
        for(var j=0;j<employees.length;++j){
            var emp_id = employees[j].emp_id
            var timecards =  dl.getAllTimecard(emp_id)
            for(var i=0;i<timecards.length;++i){
                dl.deleteTimecard(timecard_id)
            }
            dl.deleteEmployee(emp_id)
        }

        for(var k=0;k<alldepartments.length;++k){
            var dept = alldepartments[k].dept_id
            dl.deleteDepartment(company,dept);
        }

        var status =  dl.deleteCompany(company);
        if(status>0){
            res.header("Content-Type",'application/json');
            res.status(200).json({
                success: "Company " + company+ " succesfully deleted"
            })
        }else{
            res.status(200).json({
                message:'Unable to delete Company. The entered company is Invalid.'
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