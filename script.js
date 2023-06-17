/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

// create a object of all the list of alarms and its data so that we can easlily access them while iteration
var alarmsObj = [];

// ----------- display current data and time ----------- //

// for current day
var currentDay = document.getElementById("day");

//for current date
var currentDate = document.getElementById("date");

//for current Time
var currentTime = document.getElementById("time");

//this will use to compare time for alarm ringing
var currentTimeToCompare = "";

//for current second
var currentSec = document.getElementById("second");

//for zone i.e., AM or PM
var ampm = document.getElementById("zone");

//for days array to display weekdays
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//for months array to display months
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// function to display current time on the alarm
function displayCurrentTime() {
    //gives today's full date
    var date = new Date();

    //gives today's weekday in number
    let weekday = date.getDay();

    //gives today's month in number
    let month = date.getMonth();

    //gives today's date only i.e., if date is 14 Feb 2023 then it will show only 14
    let today = date.getDate();

    //gives year
    let year = date.getFullYear();

    //gives current hour
    let hour = date.getHours();

    //display AM or PM according to current time
    ampm.innerText = hour >= 12 ? "PM" : "AM";

    //it will make 24-hour format to 12-hour format
    hour = hour % 12;

    //diplay 0 to 12 as time is in 12-hour format
    if (hour == 0) {
        hour = 12;
    }

    // if hour is less than 10 then add 0 before the hour to display in double digit
    if (Number(hour) < 10) {
        hour = "0" + "" + hour;
    }

    //gives the current mintue of hour
    let minutes = date.getMinutes();

    //if minute is less than 10 then add 0 before the minute to display in double digit
    if (Number(minutes) < 10) {
        minutes = "0" + "" + minutes;
    }

    //gives current second of minute
    let second = date.getSeconds();

    //if second is less than 10 then add 0 before the second to display in double digit
    if (second < 10) {
        second = "0" + "" + second;
    }

    //display current weekday
    currentDay.innerText = days[weekday];

    //display current date in format June 13 2023
    currentDate.innerText = months[month] + " " + today + " " + year;

    //display current time in format HH:MM:SS
    currentTime.innerText = hour + ":" + minutes + ":" + second;

    currentTimeToCompare = currentTime.innerText + " " + ampm.innerText;

    //display current second but it has been hidden for display in css as we already display time above in format HH:MM:SS
    currentSec.innerText = second;

    // check if the current time is in alarms list, if yes alert user then delete it from alarmsObj

    for (let i = 0; i < alarmsObj.length; i++) {
        if (currentTimeToCompare === `${alarmsObj[i].hour}:${alarmsObj[i].minute}:${alarmsObj[i].seconds}` + " " + `${alarmsObj[i].zone}`) {
            window.alert("Wake up, you lazy bum!");
            alarmsObj.splice(i, 1);
        }
    }

    setTimeout(displayCurrentTime, 1000);
}

//displayCurrentTime() function will be called when html page loads
document.body.onload = function () {
    displayCurrentTime();
};

// ---- set alarms | Take input from user in hour minutes and seconds ----- //
var userHours = document.getElementById("getUserInputHours");
var userMinutes = document.getElementById("getUserInputMinutes");
var userSeconds = document.getElementById("getUserInputSeconds");
var userZone = document.getElementById("getUserInputZone");

//for add alarm button
var addAlarmButton = document.getElementById("add-alarm");

// -------- ON ADD ALARM BUTTON CLICK EVENT LISTENER ----------- //

function createNewAlarmDOM() {
    //if input hour value in single digit add 0 before it when display in alarm list
    if (String(userHours.value).length === 1) {
        userHours.value = "0" + "" + String(userHours.value);
    }

    //if input minute value in single digit add 0 before it when display in alarm list
    if (String(userMinutes.value).length === 1) {
        userMinutes.value = "0" + "" + String(userMinutes.value);
    }

    //if input seconds value in single digit add 0 before it when display in alarm list
    if (String(userSeconds.value).length === 1) {
        userSeconds.value = "0" + "" + String(userSeconds.value);
    }

    //for invalid Hour input from user show alert
    if (userHours.value === "" || userHours.value === null || userHours.value === "undefined" || userHours.value === undefined || userHours.value === "00" || userHours.value > 12 || userHours.value < 1) {
        window.alert("Its a 12 hour format clock, Can you please rephrase that?");
        return;
    }

    //for invalid Minutes input from user show alert
    if (userMinutes.value === "" || userMinutes.value === null || userMinutes.value === "undefined" || userMinutes.value === undefined || userMinutes.value >= 60 || userMinutes.value < 0) {
        window.alert("Please enter a valid input. I am not sure what you are trying to say, but I am pretty sure its not ( MINUTE ) time");
        return;
    }

    //for invalid  Seconds input from user show alert
    if (userSeconds.value === "" || userSeconds.value === null || userSeconds.value === "undefined" || userSeconds.value === undefined || userSeconds.value >= 60 || userSeconds.value < 0) {
        window.alert("Please enter a valid input. I am not sure what you are trying to say, but I am pretty sure its not ( SECOND ) time");
        return;
    }

    if (userZone.value === "" || userZone.value === null || userZone.value === "undefined" || userZone.value === undefined) {
        window.alert("Are you sure you want to leave this blank ( AM or PM )? I mean, its your life");
        return;
    }

    //create new alarm object when click to add alarm button
    const newAlarmObject = {
        hour: userHours.value,
        minute: userMinutes.value,
        seconds: userSeconds.value,
        zone: userZone.value,
        combinedTime: `${userHours.value}:${userMinutes.value}:${userSeconds.value}` + " " + `${userZone.value}`,
    };

    //new alarm object push to alarmsObj array
    alarmsObj.push(newAlarmObject);

    // now create a div in DOM
    var alarmItem = document.createElement("div");
    alarmItem.classList.add("alarm-items");

    // elements inside alarmItems

    var section = document.createElement("section");
    section.classList.add("time-day");

    // <----- elements inside time-day ----->

    //display time on the alarm items that has been set
    var alarmTime = document.createElement("span");
    alarmTime.classList.add("time");
    alarmTime.innerHTML = userHours.value + ":" + userMinutes.value + ":" + userSeconds.value + " " + userZone.value;

    section.appendChild(alarmTime);
    //   section.appendChild(day);

    //adding delete icon in the alarm items for deleting the set alarm
    var delButton = document.createElement("img");
    delButton.classList.add("delete");
    delButton.setAttribute("src", "./images/stopAlarmsign.png");

    // deleting the alarm items functionality to remove the set alarm
    delButton.onclick = function () {
        // first remove the data from alarmsObj
        const currentAlarmTime = this.parentNode.childNodes[0].childNodes[0].innerHTML;

        for (let i = 0; i < alarmsObj.length; i++) {
            if (alarmsObj[i].combinedTime === currentAlarmTime) {
                alarmsObj.splice(i, 1);
            }
        }

        this.parentNode.remove();
    };

    alarmItem.appendChild(section);
    alarmItem.appendChild(delButton);

    document.getElementById("alarmItems-wrapper").appendChild(alarmItem);

    // slide over to ALARM tab it is for better user experience
    // Its simple just toggle active and show classes from nav bar and tab content

    document.getElementById("nav-home-tab").classList.toggle("active");
    document.getElementById("nav-home").classList.toggle("show");
    document.getElementById("nav-home").classList.toggle("active");

    // -------- here profile is used because this tab component is used from BOOTSTRAP so i have not changed the names because there was just one component imported
    document.getElementById("nav-profile-tab").classList.toggle("active");
    document.getElementById("nav-profile").classList.toggle("show");
    document.getElementById("nav-profile").classList.toggle("active");
}

//attaching the event listener to add alarm button
addAlarmButton.addEventListener("click", createNewAlarmDOM);
