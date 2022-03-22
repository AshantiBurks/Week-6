//Display Day and time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let dd = String(now.getDate()).padStart(2, "0");
let yyyy = now.getFullYear();
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let currentDate = document.querySelector(`#date`);
currentDate.innerHTML = `${month} ${dd}, ${yyyy}`;
let timeToday = document.querySelector(`#today`);
timeToday.innerHTML = `Last updated: ${day} ${hour}:${minute}`;

function displayDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let weekday = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[weekday];
}

//Daily Forecast

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#grid");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="card">
         <span class="col">
           <h5 class="day">${displayDate(forecastDay.dt)}
           <h5>
             <img src="http://openweathermap.org/img/wn/${
               forecastDay.weather[0].icon
             }@2x.png" alt="" width="80" id="weather-icon" />
            <div class="highLow">
              <span class="high">${Math.round(forecastDay.temp.max)}°</span>
              <span class="low">${Math.round(forecastDay.temp.min)}°</span>
            </div>
          </span>
        </div>
     `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "4feb0f38acd5001b6008074430db533c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

//Get Weather
function showWeather(response) {
  fahrenheitTemperature = response.data.main.temp;

  document.querySelector("#display-city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = `${Math.round(
    fahrenheitTemperature
  )}°`;
  document.querySelector("#skies").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#humid"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )} mph`;
  document.querySelector("#feels").innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )}°`;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = `4feb0f38acd5001b6008074430db533c`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function changeName(event) {
  event.preventDefault();
  let targetName = document.querySelector("#display-city");
  targetName.innerHTML = document.querySelector("#searchItem").value;
  searchCity(targetName.innerHTML);
}

function showLocation(position) {
  let apiKey = "4feb0f38acd5001b6008074430db533c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

//Change to Celsius
function displayCelsiusTemperature(event) {
  event.preventDefault();
  //remove the active class the fahrenheit link
  celsiusLink.classList.add("active");
  FahrenheitLink.classList.remove("active");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temp.innerHTML = `${Math.round(celsiusTemperature)}°`;
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  FahrenheitLink.classList.add("active");
  temp.innerHTML = `${Math.round(fahrenheitTemperature)}°`;
}

let searchForm = document.querySelector("#key");
searchForm.addEventListener("submit", changeName);

let currentLocation = document.querySelector("#locationButton");
currentLocation.addEventListener("click", getCurrentLocation);

let celsiusLink = document.querySelector("#Celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let FahrenheitLink = document.querySelector("#Fahrenheit-link");
FahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
