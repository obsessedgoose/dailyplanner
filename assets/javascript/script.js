// HOUR ARRAY

var today = [
    {
        id: "0", hour: "9", time: "9", meridiem: "AM", reminder: ""
    },
    {
        id: "1", hour: "10", time: "10", meridiem: "AM", reminder: ""
    },
    {
        id: "2", hour: "11", time: "11", meridiem: "AM", reminder: ""
    },
    {
        id: "3", hour: "12", time: "12", meridiem: "PM", reminder: ""
    },
    {
        id: "4", hour: "13", time: "13", meridiem: "PM", reminder: ""
    },
    {
        id: "5", hour: "14", time: "14", meridiem: "PM", reminder: ""
    },
    {
        id: "6", hour: "15", time: "15", meridiem: "PM", reminder: ""
    },
    {
        id: "7", hour: "16", time: "16", meridiem: "PM", reminder: ""
    },
    {
        id: "7", hour: "17", time: "17", meridiem: "PM", reminder: ""
    },
]

// HEADER DATE
window.onload = setInterval(getHeaderDate, 1000)
function getHeaderDate() {

    var currentHeaderDate = moment().format('MMMM Do YYYY, hh:mm:ss a');
    $("#currentDay").text(currentHeaderDate);

}
// SAVE TO LOCAL
function saveTask() {
    localStorage.setItem("today", JSON.stringify(today));
}

function displayReminder() {
    today.forEach(function (currentHour) {
        $(`#${currentHour.id}`).val(currentHour.reminder);
    })
}

function initiate () {
    var storeDay = JSON.parse(localStorage.getItem("today"));

    if (storeDay) {
        today = storeDay;
    }

    saveTask();
    displayReminder();
}

// SCHEDULE BODY
today.forEach(function (currentHour) {
    // TIME BLOCK
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    // TIME FIELDS
    var hourField = $("<div>")
        .text(`${currentHour.hour}${currentHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
        });

    // SCHEDULE DATA
    var taskPlan = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var taskData = $("<textarea>");
    taskPlan.append(taskData);
    taskData.attr("id", currentHour.id);

    if (currentHour.time < moment().format("HH")) {
        taskData.attr({
            "class": "past",
        })

    } else if (currentHour.time === moment().format("HH")) {
        taskData.attr({
            "class": "present"
        })

    } else if (currentHour.time > moment().format("HH")) {
        taskData.attr({
            "class": "future"
        })
    }

    // SAVE BUTTON
    var saveButton = $("<i class='fas fa-check'></i>")
    var saveTask = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
        });
    saveTask.append(saveButton);
    hourRow.append(hourField, taskPlan, saveTask);
})



initiate();


// SAVES TO LOCAL BUTTON
$(".saveBtn").on("click", function(event) {

    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    today[saveIndex].reminder = $(this).siblings(".description").children(".future").val();

    console.log(saveIndex);
    saveTask();
    displayReminder();
})

