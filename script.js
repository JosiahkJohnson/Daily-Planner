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
//if we already have some stored tasks in local storage
if(JSON.parse(localStorage.getItem("text"))!=null){
    text = JSON.parse(localStorage.getItem("text"));
}
//initilized time variables
var date = moment().format('MMMM Do YYYY');
var day = moment().format('dddd');
//this should give me the current 24 hr format hour - 9 to sync with the index value
var hour = moment().format('H') - 9;

//fill in the current date
$(".date").text("Current Day: "+day+", "+date);

//function to change a string stored in the text array, and save it in local storage
function saveData(location, string){
    text[location] = string;
    localStorage.setItem("text",JSON.stringify(text));
}

//adds a frame for each hour in the container div
for(i=0;i<text.length;i++){
    var frame = $("<div>");
    var $container = $(".container");
    //time box on the left, input box in the middle, button box on the right
    var left = $("<div>");
    var middle = $("<div>");
    var right = $("<div>");

    //setup the row class for frame, each frame is a new row
    frame.addClass("row");

    //setup the classes for the left, middle and right
    left.addClass("col-sm-2 time-column text-center bg-info");
    //add the hour counter on the left side
    //for morning
    if(i+9<12){left.text((i+9)+"AM");}
    //for noon
    else if(i+9===12){left.text("12PM");}
    //for the afternoon
    else{left.text((i-3)+"PM");}

    //for the middle class we need an if statement to determine the color
    if(hour<i){
        //for hours in the future bg-success(green)
        middle.addClass("col-sm-8 input-column bg-success");
    }
    else if(hour === i){
        //for current hour bg-danger(red)
        middle.addClass("col-sm-8 input-column bg-danger");
    }
    else{
        //only other option is it in the past, bg-secondary(grey)
        middle.addClass("col-sm-8 input-column bg-secondary");
    }
    right.addClass("col-sm-2 save-button-column bg-primary");
    //and the attribute ids
    left.attr("id",i+"-time");
    middle.attr("id",i+"-input");
    right.attr("id",i+"-button");
    
    //append frame to the container
    $container.append(frame);
    
    //append left middle and right to the frame in that order
    frame.append(left);
    frame.append(middle);
    frame.append(right);
}

//adds the input boxes for the planner in the middle
for(i=0;i<text.length;i++){
    var inputBox = $("<textarea>");
    var $inputLocation = $("#"+i+"-input");
    
    //similar to above we need to set the background of the text box to the correct color
    if(hour<i){
        //in the future, green
        inputBox.addClass("bg-success text-field");
    }
    else if(hour===i){
        //current hour red
        inputBox.addClass("bg-danger text-field");
    }
    else{
        //past, grey
        inputBox.addClass("bg-secondary text-field");
    }
    //adds id attributes to the text areas
    inputBox.attr("id", "text-"+i);
    //attributes will be text-0, text-1, text-2, etc.
    
    //and add any already stored text from the array to the box
    inputBox.text(text[i]);
    console.log(text[i]);

    $inputLocation.append(inputBox);
}

//adds buttons to the section on the right
for(i=0;i<text.length;i++){
    var button = $("<button>");
    var $buttonLocation = $("#"+i+"-button");
    var span = $("<span>");
    //adds id attributes to buttons
    button.attr("id", i);
    //attribute ids will be named, 0, 1, 2, etc.

    span.addClass("glyphicon glyphicon-save");
    button.addClass("bg-primary btn-lg save-button");

    $buttonLocation.append(button);
    button.append(span);

    //add a click listener to each button
    button.on("click", function(event){
        event.preventDefault();
        var eventId = $(this).attr("id")

        //call the save data function
        saveData(eventId, $("#text-"+eventId).val());
    });
}