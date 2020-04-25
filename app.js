const express = require('express');
const app = express();

const company = require("./api/routes/company")
app.use("/CompanyServices/company",company)

const department = require("./api/routes/department")
app.use("/CompanyServices/department",department)

const departments = require("./api/routes/departments")
app.use("/CompanyServices/departments",departments)

const employee = require("./api/routes/employee")
app.use("/CompanyServices/employee",employee)

const employees = require("./api/routes/employees")
app.use("/CompanyServices/employees",employees)

const timecard = require("./api/routes/timecard")
app.use("/CompanyServices/timecard",timecard)

const timecards = require("./api/routes/timecards")
app.use("/CompanyServices/timecards",timecards)






module.exports = app;