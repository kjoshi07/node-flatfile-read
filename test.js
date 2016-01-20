/**
 * Created by Khemchandj on 1/18/2016.
 */
var moment = require('moment');
var str = "10012016";
var d = moment(str, "DDMMYYYY");
console.log("Date: " + d);
var n = d.toISOString();
console.log("n: " + n);
