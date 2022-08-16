
// have current day and time be displayed when page loads

function formatDate(date) {
//Day of week

let day = date.getDay();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let dayOfWeek = (days[day]);

//time minutes
let timeMinutes = date.getMinutes();
if (timeMinutes < 10) {
  timeMinutes = `0${timeMinutes}`;
}

//time of day converted to 12-Hour with AM/PM
let timeHour = date.getHours();
if (timeHour === 12) {
  return `${dayOfWeek} ${timeHour}:${timeMinutes} PM`;
} else { if (timeHour === 0) {
  return `${dayOfWeek} 12:${timeMinutes} AM`;
} else {
  if (timeHour > 12) { 
  timeHour = timeHour - 12;
  return `${dayOfWeek} ${timeHour}:${timeMinutes} PM`;
  } else {
  return `${dayOfWeek} ${timeHour}:${timeMinutes} AM`;
  }
}
}
}

let timeNow = new Date();
document.querySelector(".current-day-time").innerHTML = formatDate(timeNow);


//get current location name
function getMyLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "ca47e9200d90350ad07692b8ce034ca3";
  let apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentName);
}

function showCurrentName(currentCityName) {
   let cityName = (currentCityName.data[0].name);
   searchCity(cityName);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name").value;
  searchCity(city);
}

function searchCity(updateCity) {
let apiKey = "ca47e9200d90350ad07692b8ce034ca3";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${updateCity}&APPID=${apiKey}&units=metric`;
axios.get(`${apiUrl}`).then(showCurrentWeather);
}

function showCurrentWeather(response) {
  document.querySelector(".searched-city").innerHTML = response.data.name;

  celsiousTemperature = response.data.main.temp
  let temperatureRounded = Math.round(celsiousTemperature);
  let temp = document.querySelector(".current-temp");
  temp.innerHTML = `${temperatureRounded}`;

  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector("#description-now");
  currentDescription.innerHTML = `<strong>${description}</strong>`;
  
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity-now");
  currentHumidity.innerHTML = `${humidity}`;

  let windRounded = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind-now");
  currentWind.innerHTML = `${windRounded}`;

  let iconCode = response.data.weather[0].icon;
  document.querySelector(".current-weather-image").setAttribute("src", `images/${iconCode}.png`);
}


function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getMyLocation);
 }


function unitsFahrenheit() {
    celsious.classList.remove("active");
    fahrenheit.classList.add("active");
    document.querySelector(".current-temp").innerHTML = Math.round(celsiousTemperature * 9/5) + 32;
}

function unitsCelsious() {
    celsious.classList.add("active");
    fahrenheit.classList.remove("active");
    document.querySelector(".current-temp").innerHTML = Math.round(celsiousTemperature);
}

document.querySelector("#fahrenheit").addEventListener("click", unitsFahrenheit);

document.querySelector("#celsious").addEventListener("click", unitsCelsious);

let celsiousTemperature = null;


//submit button
let cityForm = document.querySelector(".input-city");
cityForm.addEventListener("submit", handleSubmit);

//current button
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);


//default page search
searchCity("Paris");








// toggle between F and C temperatures (not needing to use math)

//function changeUnitsF() {
//  let updateToF = document.querySelector("#f-unit");
//  updateToF.innerHTML = "<strong>°F</strong>";
//  let updateToC = document.querySelector("#c-unit");
//  updateToC.innerHTML = "°C"
//  let convertTemp = document.querySelector(".current-temp");
//  convertTemp.innerHTML = "76";
//}

//function changeUnitsC() {
//  let updateToC = document.querySelector("#c-unit");
//  updateToC.innerHTML = "<strong>°C</strong>";
//  let updateToF = document.querySelector("#f-unit");
//  updateToF.innerHTML = "°F"
//    let convertTemp = document.querySelector(".current-temp");
//  convertTemp.innerHTML = "24";
//}

//let fahrenheit = document.querySelector("#f-unit");
//let celsius = document.querySelector("#c-unit");

//fahrenheit.addEventListener("click", changeUnitsF);

//celsius.addEventListener("click", changeUnitsC);



