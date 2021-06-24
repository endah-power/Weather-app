//Date function//
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
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
  "December"
];

let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let currentDate = document.querySelector(".current-day");
currentDate.innerHTML = `${day}, ${month} ${date} ${year}`;

let currentTime = document.querySelector(".current-time");
currentTime.innerHTML = `${hour}:${minute}`;

//search bar function//
function displayCurrentWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#cloudiness").innerHTML = response.data.clouds.all;
  document.querySelector(".current-weather").innerHTML =
    response.data.weather[0].main;
  document.querySelector(".high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector(".low").innerHTML = Math.round(
    response.data.main.temp_min
  );
}

function searchCity(city) {
  let apiKey = "ed5266488adab36bb2cba2d0f886e3cf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name").value;
  searchCity(city);
}

searchCity("denpasar");

let searchForm = document.querySelector(".change-city");
searchForm.addEventListener("submit", handleSubmit);

//Geolocation//
function showCurrentWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("h1").innerHTML = `${response.data.name}`;
  document.querySelector(".current-temp").innerHTML = `${temperature}`;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#cloudiness").innerHTML = response.data.clouds.all;
  document.querySelector(".current-weather").innerHTML =
    response.data.weather[0].main;
  document.querySelector(".high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector(".low").innerHTML = Math.round(
    response.data.main.temp_min
  );
}

function showPosition(position) {
  let apiKey = "ed5266488adab36bb2cba2d0f886e3cf";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
