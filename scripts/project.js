document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".container");

// Function to create animation
    function createMeteor() {
        const meteor = document.createElement("div");
        meteor.className = "meteor";
        container.appendChild(meteor);

        const startPosition = Math.random() * window.innerWidth;
        const animationDuration = Math.random() * 3 + 2;

        meteor.style.left = startPosition + "px";
        meteor.style.animationDuration = animationDuration + "s";

        meteor.addEventListener("animationend", function () {
            container.removeChild(meteor);
        });
    }

    setInterval(createMeteor, 3000);
});

function getWeather() {
    const apiKey = 'a699049b0b45b54ba8a2c400887c288d';
    const cityInput = document.getElementById('cityInput');
    const weatherInfo = document.getElementById('weatherInfo');
    const resetButton = document.getElementById('resetButton');

    resetButton.addEventListener('click', function () {

        document.getElementById('weatherInfo').innerHTML = '';
        document.getElementById('cityInput').value = '';
        document.getElementById('extendedForecast').innerHTML = '';
    });

    const city = cityInput.value.trim();
    if (city === '') {
        alert('Please enter a city.');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');

     // Convert Kelvin to Celsius
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;

    weatherInfo.innerHTML = `Current Weather in ${data.name}: ${temperature}°C, ${description}`;
}

function getExtendedForecast() {
    const apiKey = 'a699049b0b45b54ba8a2c400887c288d';
    const cityInput = document.getElementById('cityInput');
    const extendedForecastContainer = document.getElementById('extendedForecast');

    const city = cityInput.value.trim();
    if (city === '') {
        alert('Please enter a city.');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayExtendedForecast(data.list, extendedForecastContainer);
        })
        .catch(error => {
            console.error('Error fetching extended forecast data:', error);
            alert('Error fetching extended forecast data. Please try again.');
        });
}

function displayExtendedForecast(forecastList, container) {
    container.innerHTML = '';

    const dailyForecasts = {};

    forecastList.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });

        if (!dailyForecasts[day]) {
            dailyForecasts[day] = {
                temperature: Math.round(forecast.main.temp - 273.15),
                description: forecast.weather[0].description
            };
        }
    });

// Create a list to display extended forecasts
    const forecastListElement = document.createElement('ul');

    for (const day in dailyForecasts) {
        const { temperature, description } = dailyForecasts[day];

        const listItem = document.createElement('li');
        listItem.textContent = `${day}: ${temperature}°C, ${description}`;

        forecastListElement.appendChild(listItem);
    }
    container.appendChild(forecastListElement);
}

function toggleDarkMode() {
    const body = document.body;
    const container = document.querySelector(".container");

    body.classList.toggle('dark-mode');
    container.classList.toggle('dark-mode');
}
