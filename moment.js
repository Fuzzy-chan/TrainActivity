
var previousInformation = [];
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDoN9jEjxNHSjESFLr32wAWsWyp1HKuSGI",
    authDomain: "train-activity-3f6f2.firebaseapp.com",
    databaseURL: "https://train-activity-3f6f2.firebaseio.com",
    projectId: "train-activity-3f6f2",
    storageBucket: "",
    messagingSenderId: "549392826291"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  function createTableRow(snapshot){   
     
    
  };

  console.log(Date());

  $(".submit").on("click",function(){

    event.preventDefault();

    var trainName = $("#trainNameInput").val().trim();
    var trainDestination = $("#trainDestinationInput").val().trim();
    console.log(trainName, trainDestination)

    database.ref().push({
        name: trainName,
        destination: trainDestination,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
    });//ends database ref

  });//ends submit on click event
  
  

  database.ref().on("child_added", function(childSnapshot){
    var newborn = childSnapshot.val();
    var tr = $("<tr>");
    var row = $("<th scope='row'>")   
    row.text(newborn.name)
    var td1 = $("<td>");
    td1.text(newborn.destination)
    tr.append(row, td1);
    $("#tableInfo").append(tr);
      console.log(newborn.name, newborn.destination, )
    
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });