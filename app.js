/**
 * Created by Khemchandj on 1/18/2016.
 */
var mongoose = require('mongoose');
var LineByLineReader = require('line-by-line');
var moment = require('moment');
var Q = require('q');
var Employee = require('./app/models/employee');
mongoose.connect('mongodb://localhost:27017/flatfile');

function processFlatFile() {

    try {
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
        //If there is an error in reading file then error would be thrown here.
        lr.on('error', function (err) {
            // 'err' contains error object
            console.log(err);
        });
        //If there is no error then each line wouldd be processed here so define your logic here.
        lr.on('line', function (line) {
            // 'line' contains the current line without the trailing newline character.
            //If thre is a header in file then required this to check.
            if (count == 0) {
                console.log("HEADER LINE: " + line);
                count++;
            } else {
                //Use Q insetad of callbacks.
                Q.fcall(function () {
                        if (line != null && line != "") {
                            //split line based on your separator
                            var lineElement = line.split(';');
                            //convert hire date to ISO string to save in mongoDB.
                            var hireDate = moment(lineElement[6], "DDMMYYYY").toISOString();
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
                            //save employeee object in database, if error then would be passed to cache and if there is no error then will pass to "then".
                            employee.save();


                        } else {

                            console.log("Line is blank: " + line);

                        }

                    })
                    .then(function () {
                        console.log("Line has been saved");

                    })
                    .catch(function (err) {

                        console.log("there is a error in processing line: " + line + err);

                    });

            }

        });

        lr.on('end', function () {
            // All lines are read, file is closed now.
            console.log("All line have been read and saved");
        });

    } catch (err) {
        console.log(err);

    }

}
//Call process flat file function to process data.
processFlatFile();


