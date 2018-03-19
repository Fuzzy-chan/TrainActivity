
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

  console.log(Date());
  var intervalId;
  var time = 60;
  var timerOn = false;

  if (timerOn === false){
    timerOn = true;
    intervalId = setInterval(count,1000)
}


  function count(){
    time--;    
    if (time === 0){
        location.reload();
        time = 60;     
    }
    
}

  $(".submit").on("click",function(){

    event.preventDefault();

    var trainName = $("#trainNameInput").val().trim();
    var trainDestination = $("#trainDestinationInput").val().trim();
    var initialArrivalTime = $("#initialArrivalInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();
    console.log(trainName, trainDestination)

    database.ref().push({
        name: trainName,
        destination: trainDestination,
        initialArrivalTime: initialArrivalTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
    });//ends database ref

  });//ends submit on click event
  
  // function getNextArrival(something){
  //   console.log("What's brought into Function: "+JSON.stringify(something))
  //   var arrivalTimeInMinutes = (parseInt(something.initialArrivalTime.substring(0,2)*60) + parseInt(something.initialArrivalTime.substring(2)));
  //   console.log("Arrival in Minutes: "+ arrivalTimeInMinutes)
  //   var d = new Date();
  //   var currentHour = d.getHours();
  //   console.log("Current hour: "+currentHour)
  //   var currentHourInMinutes = currentHour*60
  //   console.log("currentHourInMinutes:" +currentHourInMinutes)
  //   var currentMinutes = d.getMinutes();
  //   console.log("current Minutes: "+currentMinutes)
  //   var currentTimeInMinutes = currentHourInMinutes + currentMinutes;
  //   console.log("Time in Minutes: "+currentTimeInMinutes)
      

  //     while (arrivalTimeInMinutes <= currentTimeInMinutes){
  //       arrivalTimeInMinutes += something.frequency
  //     }
  //     console.log("Incrimented Arrival Time: " + arrivalTimeInMinutes);
      
  //     var hoursOfNextArrival = Math.floor(arrivalTimeInMinutes/60);
  //     console.log("Hour conversion back: " + hoursOfNextArrival)
  //     var minutesOfNextArrival = arrivalTimeInMinutes % 60;
  //     console.log("Minutes conversion back: " +minutesOfNextArrival)
  //     var newArrivalTime = hoursOfNextArrival.toString() + minutesOfNextArrival.toString();
  //     console.log("New Arrival Time in Function: "+ newArrivalTime)
      
  //     return newArrivalTime;   
  // }

  database.ref().on("child_added", function(childSnapshot){
    var newborn = childSnapshot.val();
    var tr = $("<tr>");
    var row = $("<th scope='row'>")   
    row.text(newborn.name)
    var td1 = $("<td>");
    td1.text(newborn.destination)
    tr.append(row, td1);
    $("#tableInfo").append(tr);

    var arrivalTimeInMinutes = (parseInt(newborn.initialArrivalTime.substring(0,2)*60) + parseInt(newborn.initialArrivalTime.substring(2)));
    console.log("Arrival in Minutes: "+ arrivalTimeInMinutes)
    var d = new Date();
    var currentHour = d.getHours();
    console.log("Current hour: "+currentHour)
    var currentHourInMinutes = currentHour*60
    console.log("currentHourInMinutes:" +currentHourInMinutes)
    var currentMinutes = d.getMinutes();
    console.log("current Minutes: "+currentMinutes)
    var currentTimeInMinutes = currentHourInMinutes + currentMinutes;
    console.log("Time in Minutes: "+currentTimeInMinutes)
      

      while (arrivalTimeInMinutes <= currentTimeInMinutes){
        arrivalTimeInMinutes += parseInt(newborn.frequency)
      }
      console.log("Incrimented Arrival Time: " + arrivalTimeInMinutes);
      
      var hoursOfNextArrival = Math.floor(arrivalTimeInMinutes/60);
      console.log("Hour conversion back: " + hoursOfNextArrival)
      var minutesOfNextArrival = arrivalTimeInMinutes % 60;
      console.log("Minutes conversion back: " +minutesOfNextArrival)
      var newArrivalTime = hoursOfNextArrival.toString() + minutesOfNextArrival.toString();
      console.log("New Arrival Time in Function: "+ newArrivalTime)

    var td2 = $("<td>");
    td2.text(newArrivalTime);
      tr.append(td2)

    var td3 = $("<td>");
    td3.text(newborn.frequency);
    tr.append(td3);

    
    
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

