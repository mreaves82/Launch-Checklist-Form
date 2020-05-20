// Write your JavaScript code here!
window.addEventListener('DOMContentLoaded', function() {

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         let destinationDisplay = document.getElementById("missionTarget");
         let index = Math.floor(Math.random() * json.length);

         destinationDisplay.innerHTML = `<h2>Mission Destination</h2>
    <ol>
    <li>Name: ${json[index].name}</li>
    <li>Diameter: ${json[index].diameter}</li>
    <li>Star: ${json[index].star}</li>
    <li>Distance from Earth: ${json[index].distance}</li>
    <li>Number of Moons: ${json[index].moons}</li>
    </ol>
    <img src="${json[index].image}"></img>`;

      });
   });


   //variables
   let form = document.querySelector('form');
   let button = document.getElementById("formSubmit");
   let faultyItems = document.getElementById('faultyItems');
   let pilotStatusLi = document.getElementById('pilotStatus');
   let coPilotStatusLi = document.getElementById('copilotStatus');
   let pilotName = document.querySelector('input[name=pilotName]');
   let coPilotName = document.querySelector('input[name=copilotName]');
   let fuelLevel = document.querySelector('input[name=fuelLevel]');
   let cargoMass = document.querySelector('input[name=cargoMass]');
   let launchStatus = document.getElementById('launchStatus');
   let inputPilot = "";
   let inputCoPilot = "";
   let inputFuel = 0;
   let inputCargo = 0;

   //Form Submission
   form.addEventListener('submit', function(event) {
      //variables
      let faultyItems = document.getElementById('faultyItems');
      inputFuel = Number(fuelLevel.value);
      inputCargo = Number(cargoMass.value);
      inputPilot = pilotName.value;
      inputCoPilot = coPilotName.value;
      let fieldsComplete = false;
      let numberFields = false;
      let cargo = false;
      let fuel = false;
      //Input validation
      if (pilotName.value.trim() === "" || coPilotName.value.trim() === "" || cargoMass.value.trim() === "" || fuelLevel.value.trim() === "") {
         window.alert('Please complete all fields.');
         event.preventDefault();
      } else if (isNaN(Number(fuelLevel.value)) || isNaN(Number(cargoMass.value))) {
         window.alert("Fuel Level and Cargo Mass must be numbers");
         event.preventDefault();
      } else {
         fieldsComplete = true;
         numberFields = true;
      }
      //includes pilot names in report

      pilotStatusLi.innerHTML = `Pilot Ready: ${inputPilot}`;
      coPilotStatusLi.innerHTML = `Copilot Ready: ${inputCoPilot}`;
      //Check for adequate fuel, and excessive cargo mass.  Update launch status display accordingly
      if (Number(fuelLevel.value) < 10000 && fieldsComplete && numberFields) {
         faultyItems.style.visibility = "visible";
         launchStatus.innerHTML = "Shuttle not ready for launch";
         launchStatus.style.color = "red";
         document.getElementById('fuelStatus').innerHTML = "Not enough fuel to complete journey!!!!!";
      } else if (Number(fuelLevel.value) >= 100000 && fieldsComplete && numberFields) {
         fuel = true;
         document.getElementById('fuelStatus').innerHTML = "Fuel level high enough for launch";
      }
      if (Number(cargoMass.value) > 10000 && fieldsComplete && numberFields) {
         faultyItems.style.visibility = "visible";
         launchStatus.innerHTML = "Shuttle not ready for launch";
         launchStatus.style.color = "red";
         document.getElementById('cargoStatus').innerHTML = "If you want to make it back, lighten the load!";
      } else if (Number(cargoMass.value) <= 10000 && fieldsComplete && numberFields) {
         document.getElementById('cargoStatus').innerHTML = "Cargo mass low enough for launch";
         cargo = true;
      }
      if (fieldsComplete && numberFields && cargo && fuel) {
         launchStatus.style.color = "green";
         launchStatus.innerHTML = "Shuttle is ready for launch";
         faultyItems.style.visibility = "visible";
      };

      //prevent the submission of input values and subsequent page reload for input value access.
      event.preventDefault();
   });//end of submit event

});//end of load event
