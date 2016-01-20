/**
 * Created by Khemchandj on 1/18/2016.
 */

var mongoose = require('mongoose');
var EmployeeSchema = new mongoose.Schema({
    employeeCode: {type: String, required: true},
    firstName: {type: String, minlength: 2, maxlength: 50},
    lastName: {type: String, minlength: 2, maxlength: 50},
    designation: {type: String, minlength: 2, maxlength: 50},
    email: {type: String, required: true},
    phone: {type: Number, maxlength: 10},
    hireDate: {type: Date, default: Date.now()},
    salary: String,
    department: String

});

module.exports = mongoose.model('Employee', EmployeeSchema);
