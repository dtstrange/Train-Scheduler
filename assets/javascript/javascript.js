$(document).ready(function() {
    //initilize firebase database
    console.log("init")
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
    	alert("EYYY");
        event.preventDefault();
        console.log("train click")
        console.log(this)

        //capture user input
        var trainName = $("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var startTime = $("#start-input").val().trim();
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

    database.ref().on("child_added", function(snapshot) {

        console.log(snapshot.val());



    });
});