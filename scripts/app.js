function getWeather() {
    const apiKey = 'a699049b0b45b54ba8a2c400887c288d'; 
    const cityInput = document.getElementById('cityInput');
    const weatherInfo = document.getElementById('weatherInfo');

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
    const temperature = Math.round(data.main.temp - 273.15); // Convertir de Kelvin a Celsius
    const description = data.weather[0].description;

    // Mostrar la información del clima
    weatherInfo.innerHTML = `Current Weather in ${data.name}: ${temperature}°C, ${description}`;
}

// Resto de tu código HTML y CSS
