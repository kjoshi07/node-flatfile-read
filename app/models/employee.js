/**
 * Created by Khemchandj on 1/18/2016.
 */
    //Load mongoosse module.
var mongoose = require('mongoose');
//Define your employee model
var EmployeeSchema = new mongoose.Schema({
    employeeCode: {type: String, required: true}, //A string type and must be present at saving time.
    firstName: {type: String, minlength: 2, maxlength: 50}, // A string type and min length should be 2 nd max can be 50.
    lastName: {type: String, minlength: 2, maxlength: 50}, // A string type and min length should be 2 nd max can be 50.
    designation: {type: String, minlength: 2, maxlength: 50}, // A string type and min length should be 2 nd max can be 50.
    email: {type: String, required: true}, //A string type and must be present at saving time.
    phone: {type: Number, maxlength: 10}, // Number type and max length can be 10.
    hireDate: {type: Date, default: Date.now()}, //A date type and if not provided then default would be current system date.
    salary: String, // A string type due to currency provided with it.
    department: String //A sTRING TYPE.

});
//EXPORT the module so can be available globally.
module.exports = mongoose.model('Employee', EmployeeSchema);
