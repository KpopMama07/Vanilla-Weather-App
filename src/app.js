let now = new Date();
let time = document.querySelector("time");
let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
let todayMinute = now.getMinutes();
if (todayMinute < 10) {
  todayMinute = `0${todayMinute}`;
}

let p = document.querySelector("p");

p.innerHTML = `${hours}:${todayMinute}`;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "Feburary",
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

weekday.innerHTML = `Today is ${day}, ${month} ${date}, ${year}`;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)} km/hr`;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;
  let main = document.querySelector("main");
  main.innerHTML = temperature + "℃";
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
}

function searchCity(city) {
  let apiKey = "c6f8ef4575250284954db9f4dfa7a996";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

searchCity("Shibukawa");

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchInput").value;
  let h1 = document.querySelector("h1");
  if (searchInput.value === "") {
    h1.innerHTML = "searchInput";
  } else {
    h1.innerHTML = "Please enter your city!";
    searchCity(searchInput);
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function searchLocation(position) {
  let apiKey = "c6f8ef4575250284954db9f4dfa7a996";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
