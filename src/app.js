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
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)} km/hr`;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let main = document.querySelector("main");
  main.innerHTML = temperature + "℃";
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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
    h1.innerHTML = "#searchInput";
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

let celsiusTemperature = null;

function showFarenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#actualDegree");
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemperature) + "°F";
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFarenheitTemperature);

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#actualDegree");
  temperatureElement.innerHTML = Math.round(celsiusTemperature) + "°C";
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsiusTemperature);
