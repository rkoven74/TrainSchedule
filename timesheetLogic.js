

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyBFbYY4lRZvbNGpecw3Ua1vnYVlBPQjPyw",
    authDomain: "trainschedule-6309d.firebaseapp.com",
    databaseURL: "https://trainschedule-6309d.firebaseio.com",
    projectId: "trainschedule-6309d",
    storageBucket: "",
    messagingSenderId: "393068067697"
  };
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#submit-btn").on("click", function(event) {
  event.preventDefault();
    console.log($("#firstTrainTime-input").val().trim());
  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrainTime = $("#firstTrainTime-input").val().trim();
  var frequency = moment($("#frequency-input").val().trim(), "00:00");

    console.log(frequency);
  // Creates local "temporary" object for holding train data
  var trainInfo = {
    name: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency._i,
   };

  // Uploads train data to the database
  database.ref().push(trainInfo);

  

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#firstTrainTime-input").val("");
  $("#frequency-input").val("");
  });

// 3. Create Firebase event for adding new trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  ;

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().firstTrainTime;
  var frequency = childSnapshot.val().frequency;
 
  
 

  // Prettify the train First Start
  var firstTrainTime = moment.unix(firstTrainTime).format("00:00");

 
 
  

  
  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(firstTrainTime),
    $("<td>").text(frequency),
      
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

