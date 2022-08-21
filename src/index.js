
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



function handleSubmit(event) {
  event.preventDefault();
  celsious.classList.add("active");
  fahrenheit.classList.remove("active");
  let city = document.querySelector("#input-city-name").value;
  let apiKey = "ca47e9200d90350ad07692b8ce034ca3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showCurrentWeather);
}

function getForecast(coordinates) {
 let apiKey = "ca47e9200d90350ad07692b8ce034ca3";
 let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${forecastUnits}`;
 axios.get(`${apiUrl}`).then(displayForecast);

}

function showCurrentWeather(response) {
  document.querySelector(".current-city-name").innerHTML = response.data.name;

  celsiousTemperature = response.data.main.temp
  let temperatureRounded = Math.round(celsiousTemperature);
  let temp = document.querySelector(".current-temperature-value");
  temp.innerHTML = `${temperatureRounded}`;

  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector("#current-description");
  currentDescription.innerHTML = `<strong>${description}</strong>`;
  
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = `${humidity}`;

  let windRounded = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#current-wind");
  currentWind.innerHTML = `${windRounded}`;

  let iconCode = response.data.weather[0].icon;
  document.querySelector(".current-weather-image").setAttribute("src", `images/${iconCode}.png`);
  coordinatesInfo = response.data.coord;
  getForecast(coordinatesInfo); 
}


function unitsFahrenheit() {
    celsious.classList.remove("active");
    fahrenheit.classList.add("active");
    document.querySelector(".current-temperature-value").innerHTML = Math.round(celsiousTemperature * 9/5) + 32;
    forecastUnits = "imperial";
    getForecast(coordinatesInfo);
}

function unitsCelsious() {
  celsious.classList.add("active");
  fahrenheit.classList.remove("active");
  document.querySelector(".current-temperature-value").innerHTML = Math.round(celsiousTemperature);
  forecastUnits = "metric";
    getForecast(coordinatesInfo);
}

function formatFutureDate(timestamp) {
  let futureDate = new Date(timestamp * 1000);
  let futureDay = futureDate.getDay();
  let futureDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return futureDayNames[futureDay];
}

function displayForecast(response) {
 
  let futureDates = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  futureDates.forEach(function(futureDay, index) {
    if (index < 5) { 
      forecastHTML = forecastHTML +
           `<div class="col-2 card-spacing">
              <div class="card" style="width: 7rem">
                <div class="card-body future-card">
                  <div class="future-day">${formatFutureDate(futureDay.dt)}</div>
                        <img
                          src="images/${futureDay.weather[0].icon}.png"
                          alt="weather image"
                          class="future-image"
                        />
                      <div><span class="future-high">${Math.round(futureDay.temp.max)}°</span>
                      <span class="future-low">/${Math.round(futureDay.temp.min)}°</span></div>
                  </div>
              </div>
            </div>`;
    }
  })
  
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


document.querySelector("#fahrenheit").addEventListener("click", unitsFahrenheit);

document.querySelector("#celsious").addEventListener("click", unitsCelsious);

let celsiousTemperature = null;
let coordinatesInfo = null;
let forecastUnits = "metric";

let city = "New York";
document.querySelector(".input-city").addEventListener("submit", handleSubmit);

let timeNow = new Date();
document.querySelector(".current-day-time").innerHTML = formatDate(timeNow);

//submit button

let apiKey = "ca47e9200d90350ad07692b8ce034ca3";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;
axios.get(`${apiUrl}`).then(showCurrentWeather);



