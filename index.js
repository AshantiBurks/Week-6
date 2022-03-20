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

function searchCity(city) {
  let apiKey = `4feb0f38acd5001b6008074430db533c`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

//Search for a city
function showWeather(response) {
  let iconElement = document.querySelector("#icon");
  document.querySelector("#display-city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = `${Math.round(
    response.data.main.temp
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
  iconElement.setAttribute(
    "src",
    ` https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function changeName(event) {
  event.preventDefault();
  let targetName = document.querySelector("#display-city");
  targetName.innerHTML = document.querySelector("#searchItem").value;
  searchCity(targetName.innerHTML);
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "4feb0f38acd5001b6008074430db533c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let searchForm = document.querySelector("#key");
searchForm.addEventListener("submit", changeName);

let currentLocation = document.querySelector("#locationButton");
currentLocation.addEventListener("click", getCurrentLocation);
