function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let days = day[now.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${days} ${hours}:${minutes}`;
}
function searchCity(response) {
  let cityElement = (document.querySelector("#main-city").innerHTML =
    response.data.name);
  let descriptionElement = (document.querySelector("#description").innerHTML =
    response.data.weather[0].description);
  let humidityElement = (document.querySelector("#humidity-info").innerHTML =
    response.data.main.humidity);
  let windElement = (document.querySelector("#wind-info").innerHTML =
    response.data.wind.speed);
  let temperatureElement = (document.querySelector("#temp-info").innerHTML =
    Math.round(response.data.main.temp));
  let dateElement = document.querySelector("#day-time");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let mainIconEl = document.querySelector("#main-icon");
  let mainIconElAPI = response.data.weather[0].icon;

  if (mainIconElAPI === "01d") {
    mainIconEl.setAttribute("src", `images/sun.png`);
  } else if (mainIconElAPI === "02d") {
    mainIconEl.setAttribute("src", `images/suncloud.png`);
  } else if (mainIconElAPI === "03d") {
    mainIconEl.setAttribute("src", `images/cloud.png`);
  } else if (mainIconElAPI === "04d") {
    mainIconEl.setAttribute("src", `images/clouds.png`);
  } else if (mainIconElAPI === "04n") {
    mainIconEl.setAttribute("src", `images/nightcloudy.png`);
  } else if (mainIconElAPI === "09d") {
    mainIconEl.setAttribute("src", `images/rain.png`);
  } else if (mainIconElAPI === "10d") {
    mainIconEl.setAttribute("src", `images/sunrain.png`);
  } else if (mainIconElAPI === "11d") {
    mainIconEl.setAttribute("src", `images/thunderstorm.png`);
  } else if (mainIconElAPI === "13d") {
    mainIconEl.setAttribute("src", `images/snow.png`);
  } else if (mainIconElAPI === "03n") {
    mainIconEl.setAttribute("src", `images/clouds.png`);
  } else if (mainIconElAPI === "50n") {
    mainIconEl.setAttribute("src", `images/haze.png`);
  } else if (mainIconElAPI === "13n") {
    mainIconEl.setAttribute("src", `images/snow.png`);
  } else if (mainIconElAPI === "01n") {
    mainIconEl.setAttribute("src", `images/nightclearsky.png`);
  } else if (mainIconElAPI === "02n") {
    mainIconEl.setAttribute("src", `images/nightcloudy.png`);
  } else if (mainIconElAPI === "10n") {
    mainIconEl.setAttribute("src", `images/nightrain.png`);
  } else if (mainIconElAPI === "50d") {
    mainIconEl.setAttribute("src", `images/mist.png`);
  } else {
    mainIconEl.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${mainIconElAPI}@2x.png`
    );
  }
  getForecast(response.data.coord);
}

/*iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );*/

function getCity(city) {
  let apiKey = "8ffe8ebc319a3f920065447a31ce0df0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(searchCity);
}

function search(event) {
  event.preventDefault();

  let citySearchInput = document.querySelector("#search-input");
  getCity(citySearchInput.value); //Here we are telling axios url to show the info of the city in the placeholder
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
getCity("Milan");

function formatDay(timestamp) {
  //This function is for concactinating the days in the displayForecast function
  let now = new Date(timestamp * 1000);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  return day;
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  forecastHTML = `<div class="row">`;
  console.log(response.data.daily);
  let forecast = response.data.daily;
  forecast.forEach(function (forecastDay, index) {
    //the forecastDay parameter is equals to forecast variable
    //we created the index to tell how many times the html should be repeated
    if (index < 5) {
      let mainIconEl = document.querySelector("#main-icon2");
      let mainIconElAPI = forecastDay.weather[0].icon;

      if (mainIconElAPI === "01d") {
        mainIconEl = `images/sun.png`;
      } else if (mainIconElAPI === "02d") {
        mainIconEl = `images/suncloud.png`;
      } else if (mainIconElAPI === "03d") {
        mainIconEl = `images/cloud.png`;
      } else if (mainIconElAPI === "04d") {
        mainIconEl`images/clouds.png`;
      } else if (mainIconElAPI === "04n") {
        mainIconEl = `images/nightcloudy.png`;
      } else if (mainIconElAPI === "09d") {
        mainIconEl = `images/rain.png`;
      } else if (mainIconElAPI === "10d") {
        mainIconEl = `images/sunrain.png`;
      } else if (mainIconElAPI === "11d") {
        mainIconEl = `images/thunderstorm.png`;
      } else if (mainIconElAPI === "13d") {
        mainIconEl = `images/snow.png`;
      } else if (mainIconElAPI === "03n") {
        mainIconEl = `images/clouds.png`;
      } else if (mainIconElAPI === "50n") {
        mainIconEl = `images/haze.png`;
      } else if (mainIconElAPI === "13n") {
        mainIconEl = `images/snow.png`;
      } else if (mainIconElAPI === "01n") {
        mainIconEl = `images/nightclearsky.png`;
      } else if (mainIconElAPI === "02n") {
        mainIconEl = `images/nightcloudy.png`;
      } else if (mainIconElAPI === "10n") {
        mainIconEl = `images/nightrain.png`;
      } else if (mainIconElAPI === "50d") {
        mainIconEl = `images/mist.png`;
      } else {
        mainIconEl = `http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png`;
      }

      forecastHTML =
        forecastHTML +
        `<div class="col">
                
                  <div class="row-day">${formatDay(forecastDay.dt)}</div>
                  <div><img src=${mainIconEl} class="icon2" id="main-icon2" /></div>
                  <div class="row-degree">
                      <span class="temp-max" id="temp-max" id="temp-max">${Math.round(
                        forecastDay.temp.max
                      )}°</span>
                        <span class="temp-min" id="temp-min" id="temp-min">${Math.round(
                          forecastDay.temp.min
                        )}°</span>
                    
                  </div>
                
              </div>
              `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "8ffe8ebc319a3f920065447a31ce0df0";
  let latitude = `${coordinates.lat}`;
  let longitude = `${coordinates.lon}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
