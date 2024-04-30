function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  timeElement.innerHTML = formatDate(date);
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  descriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = temperature;
  cityElement.innerHTML = response.data.city;

  getForecast(response.data.city);
}
function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "836b30e144c862affc65t86eb36f0o6f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}
function getForecast(city) {
  let apiKey = "836b30e144c862affc65t86eb36f0o6f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let days = ["Tues", "Wed", "Thur", "Fri", "Sat"];
  let forecastHtml = "";
  response.data.daily.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="weather-forecast-day">
            <div class="weather-forecast-date">Tue</div>
            <div class="weather-forecast-icon">⛅</div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>${day.temperature.maximum}°</strong>
              </div>
              <div class="weather-forecast-temperature">9°</div>
            </div>
          </div>`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Mahikeng");
