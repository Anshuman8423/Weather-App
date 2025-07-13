let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");
let city = "Kanpur";

// Get actual country name
const getCountryName = async (code) => {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code);
};

// Get formatted date time
const getDateTime = (dt) => {
    const curDate = new Date(dt * 1000);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', options).format(curDate);
};

// Search form submit
citySearch.addEventListener("submit", (e) => {
    e.preventDefault();

    let cityInput = citySearch.querySelector(".city_name");
    if (cityInput && cityInput.value.trim() !== "") {
        city = cityInput.value.trim();
        getWeatherData();
        cityInput.value = "";
    }
});

const getWeatherData = async () => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f0a320ffd671b0d7635e45f170366126&units=metric`;

    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        console.log(data);

        const { main, name, weather, wind, sys, dt } = data;
        const country = await getCountryName(sys.country);

        cityName.innerHTML = `${name}, ${country}`;
        dateTime.innerHTML = getDateTime(dt);

        w_forecast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Weather Icon">`;

        w_temperature.innerHTML = `${main.temp.toFixed(0)}&#176;`;
        w_minTem.innerHTML = `Min: ${main.temp_min.toFixed(0)}&#176;`;
        w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed(0)}&#176;`;

        w_feelsLike.innerHTML = `Feels like: ${main.feels_like.toFixed(0)}&#176;`;
        w_humidity.innerHTML = `Humidity: ${main.humidity}%`;
        w_wind.innerHTML = `Wind: ${wind.speed} m/s`;
        w_pressure.innerHTML = `Pressure: ${main.pressure} hPa`;

    } catch (error) {
        console.log("Error fetching weather data:", error);
    }
};

// Load data on page load
window.addEventListener("load", getWeatherData);
