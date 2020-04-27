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
                count += findKeyValueCount(key, value, v)
            }
            else if(k === key && v === value) {
                count += 1;
            }
        });
        return count;
    },

    isUnique: function(key, value, obj) {
        return findKeyValueCount(key, value, obj) === 1;
    }






  };
