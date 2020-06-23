//Real Date & Time

let now = new Date();
let weekDaysList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let weekDay = weekDaysList[now.getDay()];
let monthsList = [
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
let month = monthsList[now.getMonth()];
let day = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

document.querySelector(
  "#date"
).innerHTML = `${weekDay}, ${day} ${month} ${year}`;

document.querySelector("#time").innerHTML = `${hour}:${minutes}`;

//Forecast Dates

let weekListForecast = [
  "SUN",
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
  "SUN",
  "MON",
  "TUE",
  "WED",
  "THU"
];

let day1Week = weekListForecast[now.getDay() + 1];
let day1Day = now.getDate() + 1;
document.querySelector("#dayOne").innerHTML = `${day1Week} ${day1Day}`;

let day2Week = weekListForecast[now.getDay() + 2];
let day2Day = now.getDate() + 2;
document.querySelector("#dayTwo").innerHTML = `${day2Week} ${day2Day}`;

let day3Week = weekListForecast[now.getDay() + 3];
let day3Day = now.getDate() + 3;
document.querySelector("#dayThree").innerHTML = `${day3Week} ${day3Day}`;

let day4Week = weekListForecast[now.getDay() + 4];
let day4Day = now.getDate() + 4;
document.querySelector("#dayFour").innerHTML = `${day4Week} ${day4Day}`;

let day5Week = weekListForecast[now.getDay() + 5];
let day5Day = now.getDate() + 5;
document.querySelector("#dayFive").innerHTML = `${day5Week} ${day5Day}`;

//Change to celsius

function changeCelsius(event) {
  event.preventDefault();
  document.querySelectorAll(".unit").forEach(function(unitCelsius) {
    unitCelsius.innerHTML = `ºC`;
  });
}
document
  .querySelector("#buttonCelsius")
  .addEventListener("click", changeCelsius);

//Change to farenheit

function changeFahrenheit(event) {
  event.preventDefault();
  document.querySelectorAll(".unit").forEach(function(unitFahrenheit) {
    unitFahrenheit.innerHTML = `ºF`;
  });
  let text = document.querySelectorAll(".temp");
  let integer = parseInt(text, 10);
  let convertToF = integer * 1.8 + 32;
  let tempFarenheitList = document.querySelectorAll(".temp");
  tempFarenheitList.forEach(function(tempFarenheit) {
    tempFarenheit.innerHTML = `${convertToF}`;
  });
}

document
  .querySelector("#buttonFahrenheit")
  .addEventListener("click", changeFahrenheit);

//Change temperature of search city

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#actualTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#weatherType"
  ).innerHTML = response.data.weather[0].main.toLowerCase();
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#maxTempToday").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#minTempToday").innerHTML = Math.round(
    response.data.main.temp_min
  );

  let actualIcon = document.querySelector(".mainIcon");
  let icon = response.data.weather[0].icon;
  actualIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

//Change to Current Position
function retrieveCurrentPosition(position) {
  let apiKey = "ea5fe00921de42e74dba520ea97ccfbf";
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrieveCurrentPosition);
}

document
  .querySelector("#currentLocationButton")
  .addEventListener("click", getCurrentPosition);

//Change city

function searchEngine(city) {
  let apiKey = "ea5fe00921de42e74dba520ea97ccfbf";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchBar").value;
  searchEngine(city);
}

document.querySelector("#submitCity").addEventListener("submit", handleSubmit);

//Current default
searchEngine("Barcelona");
