//This script is used for keeping track of time and storing data from the daily planner.

//text array will store a string for all the text in the input fields
var text = [
    "",//0 9AM
    "",//1 10AM
    "",//2 11AM
    "",//3 12PM
    "",//4 1PM
    "",//5 2PM
    "",//6 3PM
    "",//7 4PM
    ""//8 5PM
]
//initilized time variables
var date = moment().format('MMMM Do YYYY');
var hour = moment().format('h');
console.log(date);
console.log(hour);