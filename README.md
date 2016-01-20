#How to process a flat file in node.js
# 1. Create a flat file put it in your app's root folder, I have my flat file like this:
        EmployeeCode;First Name; Last Name;Designation;email;Phone Number;Hire Date(DDMMYYYY);Salary($);Department
        E00001;John;Due;Software Engineer;john@test.com;8100010001;01102015;$5000;Engineering
        E00002;Nane;Due;Software Engineer;nane@test.com;8100010002;01102015;$5000;Engineering
        E00003;Chris;Browne; Sr. Software Engineer;chris@test.com;8100010003;01102015;$6000;Engineering
        E00004;Mark;Tyler;Marketing Manager;mark@test.com;8100010004;02102015;$6000;Marketing
        E00005;David;Wilson;Software Engineer;david@test.com;8100010005;01102015;$5000;Engineering
        E00006;Nancy;Torre;Software Engineer;nancy@test.com;8100010006;01102015;$5000;Engineering
        E00007;Andrew;Johnson;Manager;andrew@test.com;8100010007;01102015;$5000;Engineering
        E00008;John;Moore;Software Engineer;john1@test.com;8100010008;01102015;$5000;Engineering
        E00009;Paul;Due;Software Engineer;paul@test.com;8100010009;01102015;$5000;Engineering
        E00010;Paul;Larkin;Lead;paul1@test.com;8100010011;21102015;$5000;Engineering

# 2. Define your mongoose model, I have define mine in app/models/employee.js

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
    
# 3. Used "line-by-line" module
      so go to your project foldder and install this module from https://www.npmjs.com/package/line-by-line
        #npm install line-by-line --save
      
#4.Read your file
    //Define options to read line so empty lines can be skipped.
        var options = {
            encoding: 'utf8',
            skipEmptyLines: true
        };
        //Define a count variable so header can b ignore for first line.if you do not have header then
        // no need to define and remove if condition from read line section.
        var count = 0;
        //Read text file from ame folder, you can use path if file is somewhere else.
        var lr = new LineByLineReader('data.txt', options);
        
#5. process each line inside "line" event:
    lr.on('line', function (line) {
	   // 'line' contains the current line without the trailing newline character.
    });
    
#6. split your line based on seprator
    //split line based on your separator
    var lineElement = line.split(';');
#7. use moment module to convert your date format to mongodb ISO date format
     //convert hire date to ISO string to save in mongoDB.
    var hireDate = moment(lineElement[6], "DDMMYYYY").toISOString();

#8. create your employee object from object model you created.
     //initiate a employee object to save in database.
                            var employee = new Employee({
                                employeeCode: lineElement[0],
                                firstName: lineElement[1],
                                lastName: lineElement[2],
                                designation: lineElement[3],
                                email: lineElement[4],
                                phone: lineElement[5],
                                hireDate: hireDate,
                                salary: lineElement[7],
                                department: lineElement[8]
                            });
                            
#9. save employee object
     //save employeee object in database, if error then would be passed to cache and if there is no error then will pass to "then".
    employee.save();
    
#10. I have used Q module instead of callbacks so after saving in database, if thee would be error then it ould go to .cache otherwise will go to .then
     .then(function () {
       console.log("Line has been saved");

       })
      .catch(function (err) {
          console.log("there is a error in processing line: " + line + err);
       });
