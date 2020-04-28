module.exports = {
    dept_no_exists: function (departments,dept_no) {
        var hasMatch =false;
        for (var index = 0; index < departments.length; ++index) {
            var individual_department = departments[index];
            if(individual_department.dept_no == dept_no){
                hasMatch = true
                return hasMatch
            }
        }
        return hasMatch
    },

    dept_id_exists: function (departments,dept_id) {
        var hasMatch =false;
        for (var index = 0; index < departments.length; ++index) {
            var individual_department = departments[index];
            if(individual_department.dept_id == dept_id){
                hasMatch = true
                return hasMatch
            }
        }
        return hasMatch
    },

    mng_id_exists: function (employees,mng_id) {
        var hasMatch =false;
        for (var index = 0; index < employees.length; ++index) {
            var individual_employee = employees[index];
            if(individual_employee.mng_id == mng_id){
                hasMatch = true
                return hasMatch
            }
        }
        return hasMatch
    },
    emp_id_exists: function (employees,emp_id) {
        var hasMatch =false;
        for (var index = 0; index < employees.length; ++index) {
            var individual_employee = employees[index];
            if(individual_employee.emp_id == emp_id){
                hasMatch = true
                return hasMatch
            }
        }
        return hasMatch
    },

    dept_id_no_unique: function(departments,dept_id,dept_no){
        var dept_nos = []
        
        for (var index = 0; index < departments.length; ++index) {
            var individual_department = departments[index];
            if(individual_department.dept_id != dept_id){
                dept_nos.push(individual_department.dept_no)
            }
        }

        if(dept_nos.includes(dept_no)){
            return false
        }else{
            return true
        }
    
    },
    find_key_value_count: function(key,value,obj){
        var count = 0;
        var keys = Object.keys(obj);
        keys.forEach(function(k) {
            var v = obj[k];
            if(typeof v === 'object') {
                count += module.exports.find_key_value_count(key, value, v)
            }
            else if(k === key && v === value) {
                count += 1;
            }
        });
        return count;
    },

    isUnique: function(key, value, obj) {
        return find_key_value_count(key, value, obj) === 0;
    },

    isFutureDate: function(idate){
        var today = new Date().getTime()
        if(idate - today > 0){
            return true
        }else{
            return false
        }
    }






  };