function getLocation() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        throw new Error("No geolocation available");
    }
}
function showPosition(position){
    $("#lon").val(position.coords.longitude);
    $("#lat").val(position.coords.latitude);
}

///-- DATE CODE --------------------------------------------------->

const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var today= new Date();

$(".today").text(day[today.getDay()]);
$(".today-date").text(today.getDate()+" "+month[today.getMonth()]+" "+today.getFullYear());