

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
     
    var tr = $("<tr>");
    var row = $("<th scope='row'>")   
    row.text(snapshot.val().name)
    var td1 = $("<td>");
    td1.text(snapshot.val().destination)
    var td2 = $("<td>");
    td2.text(snapshot.val().arrival)
    var td3 = $("<td>");
    td3.text(snapshot.val().timeLeft)
    tr.append(row, td1,td2,td3);
    tr.appendTo($(".tableBody"))
  };

  console.log(Date());

  $(".submit").on("click",function(){

    event.preventDefault();

    var trainName = $("#trainNameInput").val().trim();
    var trainDestination = $("#trainDestinationInput").val().trim();
    var initialArrivalTime = $("#initialArrivalTimeInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();
    console.log(trainName, trainDestination, initialArrivalTime, frequency)

    database.ref().set({
        name: trainName,
        destination: trainDestination,
        initialArrivalTime: initialArrivalTime,
        frequency: frequency
    });//ends database ref

  });//ends submit on click event
  
  function findNextArrival(snapshot){
      var initHourInMinutes = snapshot.val().initialArrivalTime.substring(0,2) * 60;
      var initMinutes = snapshot.val().initialArrivalTime.substring(2);
      var initialArrivalInMinutes = initHourInMinutes + initMinutes;
      var freq = snapshot.val().frequency;
      var d = new Date();
      var currentHourInMinutes = d.getHours()*60;
      var currentMinutes = d.getMinutes();
      var currentTimeInMinutes = currentHourInMinutes + currentMinutes;
      //I have current time, now I need to find out when the next arrival would be!

      if (currentTimeInMinutes !== init){
          
              while (currentTimeInMinutes > init){
                  initialArrivalInMinutes += freq;
              }
              
            var timeLeftMinutes = initialArrivalInMinutes - currentTimeInMinutes;
            var hours = Math.floor(initHourInMinutes/60)*100;
            var minutes = initHourInMinutes.substring(2);
            var arrival = hours + minutes;
            var hoursLeft = Math.floor(timeLeftMinutes/60)*100;
            var minutesLeft = timeLeftMinutes.substring(2);
              database.ref().update({
                arrival: arrival,
                timeLeft: timeLeft
            })//ends database set for arrival
            console.log(database.arrival)
        

            if (currentTimeInMinutes < initialArrivalInMinutes){
                var timeLeftMinutes = initialArrivalInMinutes - currentTimeInMinutes;
                var hours = Math.floor(initHourInMinutes/60)*100;
                var minutes = initHourInMinutes.substring(2);
                var arrival = hours + minutes;
                var hoursLeft = Math.floor(timeLeftMinutes/60)*100;
                var minutesLeft = timeLeftMinutes.substring(2);
            database.ref().update({
                arrival: arrival,
                timeLeft: timeLeft
            })//ends database set for arrival

          }

      }

      else{
        var timeLeftMinutes = initialArrivalInMinutes - currentTimeInMinutes;
        var timeLeftMinutes = initialArrivalInMinutes - currentTimeInMinutes;
            var hours = Math.floor(initHourInMinutes/60)*100;
            var minutes = initHourInMinutes.substring(2);
            var arrival = hours + minutes;
            var hoursLeft = Math.floor(timeLeftMinutes/60)*100;
            var minutesLeft = timeLeftMinutes.substring(2);
          database.ref().update({
              arrival: arrival,
              timeLeft: timeLeft
          })//ends database set for arrival
      }
      console.log(currentTime)
  }//ends findNextArrival function

  database.ref().on("value", function(snapshot) {
      console.log(snapshot.val().name, snapshot.val().destination, snapshot.val().initialArrivalTime, snapshot.val().frequency)
    findNextArrival(snapshot);
    createTableRow(snapshot);

    
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });