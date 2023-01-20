function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let amPm = hours >= 12 ? "PM" : "AM";
    if (hours > 12) {
        hours += ((hours + 11) % 12) + 1;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
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
    return `Last updated: ${day} ${hours}:${minutes} ${amPm}`;
}
function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    return days[day];
}
function displayForecast(response) {
    let forecastInfo = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;

    forecastInfo.forEach(function (forecastDay, index) {
        if (index < 6) {
            forecastHTML =
                forecastHTML +
                `<div class="col">
              <div class="forecast-date">${formatDay(forecastDay.time)}</div>
              <img class="sat-icon" src=${forecastDay.condition.icon_url} alt=${forecastDay.condition.icon
                } width="42"/>
              <div class="forecast-temp">
                <span class="temperature-max">${Math.round(
                    forecastDay.temperature.maximum
                )}</span
                ><span class="temperature-min">${Math.round(
                    forecastDay.temperature.minimum
                )}°</span>
              </div>
            </div>`;
        }
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
    let temperature = (document.querySelector(".temperature").innerHTML =
        Math.round(response.data.temperature.current));
    let city = (document.querySelector(".city").innerHTML = response.data.city);
    let description = (document.querySelector("#description").innerHTML =
        response.data.condition.description);
    let humidity = (document.querySelector(".humidity").innerHTML =
        "Humidity: " + response.data.temperature.humidity + "%");
    let wind = (document.querySelector(".wind").innerHTML =
        "Wind: " + Math.round(response.data.wind.speed) + "mph");
    let date = document.querySelector(".date");
    let icon = document.querySelector(".icon");
    fahrenheitTemp = response.data.temperature.current;
    date.innerHTML = formatDate(response.data.time * 1000);
    icon.setAttribute("src", response.data.condition.icon_url);
    icon.setAttribute("alt", response.data.condition.description);
}

function search(city) {
    let apiKey = "047ff5f243b184d84367a2f1o1cta7f9";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayTemperature);
    axios.get(apiUrlForecast).then(displayForecast);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#search-input");
    let newCity = document.querySelector(".city");
    newCity.innerHTML = cityInput.value;
    search(cityInput.value);
}

function changeToFahrenheit(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperature = document.querySelector(".temperature");
    temperature.innerHTML = Math.round(fahrenheitTemp);
}
function changeToCelsius(event) {
    event.preventDefault();
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
    let temperature = document.querySelector(".temperature");
    temperature.innerHTML = Math.round(celsiusTemp);
}

let fahrenheitTemp = null;
search("San Francisco");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", changeToCelsius);