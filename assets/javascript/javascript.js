$(document).ready(function() {
    //initilize firebase database
    var config = {
        apiKey: "AIzaSyDJb6OMREhZ_xH1D2jIfk9DXvgKEbKkRg0",
        authDomain: "train-scheduler-68b03.firebaseapp.com",
        databaseURL: "https://train-scheduler-68b03.firebaseio.com",
        projectId: "train-scheduler-68b03",
        storageBucket: "train-scheduler-68b03.appspot.com",
        messagingSenderId: "139344158061"
    };
    firebase.initializeApp(config);

    var database = firebase.database();


    //button to add trainschedule
    $("#add-train-btn").on("click", function(event) {
        event.preventDefault();


        //capture user input
        var trainName = $("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var startTime = moment($("#start-input").val().trim(), "HH:mm").format("X");
        var frequency = $("#frequency-input").val().trim();

        var trainData = {
            trainName: trainName,
            destination: destination,
            startTime: startTime,
            frequency: frequency
        };

        //upload data to database
        database.ref("/trains").push(trainData);

        //log the data in console
        console.log(trainData.trainName);
        console.log(trainData.destination);
        console.log(trainData.startTime);
        console.log(trainData.frequency);

        //clear the input field
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#start-input").val("");
        $("#frequency-input").val("");


    }); //end on click

    database.ref("/trains").on("child_added", function(snapshot) {

        console.log(snapshot.val());

        //train info
        var dbTrainName = snapshot.val().trainName;
        var dbDestination = snapshot.val().destination;
        var dbStartTime = snapshot.val().startTime;
        var dbFrequency = snapshot.val().frequency;

        var timeArr = dbStartTime.split(":");
        var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
        var maxMoment = moment().max(moment(), trainTime);
        var nextTime;
        var minAway;
        //alert(minAway)
        //military time diplay
        var MT = moment.unix(dbStartTime).format("HH:mm");

        if (maxMoment === trainTime) {
            nextTime = trainTime.format("hh:mm");
            nextTime = trainTime.diff(moment(), "minutes");
        } else {
            var differenceTimes = moment().diff(trainTime, "minutes");
            var tRemainder = differenceTimes % dbFrequency;
            tMinutes = dbFrequency - tRemainder;

            tArrival = moment().add(tMinutes, "m").format("hh:mm");
        }


        console.log(dbTrainName);
        console.log(dbDestination);
        console.log(dbStartTime);
        console.log(dbFrequency)
        console.log(MT)
        console.log(tMinutes)
        console.log(tArrival)

        $("#tTable").append("<tr><td>" + dbTrainName + "</td><td>" + dbDestination + "</td><td>" + dbFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>")


    }); //end on child_added
}); //end document.ready