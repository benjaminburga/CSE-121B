document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".container");

    // Función para crear meteoritos
    function createMeteor() {
        const meteor = document.createElement("div");
        meteor.className = "meteor";
        container.appendChild(meteor);

        const startPosition = Math.random() * window.innerWidth;
        const animationDuration = Math.random() * 3 + 2;

        meteor.style.left = startPosition + "px";
        meteor.style.animationDuration = animationDuration + "s";

        // Eliminar el meteorito después de la animación
        meteor.addEventListener("animationend", function () {
            container.removeChild(meteor);
        });
    }

    // Crear meteoritos cada pocos segundos
    setInterval(createMeteor, 2);
});

function getWeather() {
    const apiKey = 'a699049b0b45b54ba8a2c400887c288d';
    const cityInput = document.getElementById('cityInput');
    const weatherInfo = document.getElementById('weatherInfo');
    const resetButton = document.getElementById('resetButton');
    

    // Agregamos un evento de clic al botón
    resetButton.addEventListener('click', function () {
        // Limpiamos los resultados
        document.getElementById('weatherInfo').innerHTML = '';
        // Limpiamos el valor del input
        document.getElementById('cityInput').value = '';
        document.getElementById('extendedForecast').innerHTML='';
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
    const temperature = Math.round(data.main.temp - 273.15); // Convertir de Kelvin a Celsius
    const description = data.weather[0].description;

    // Mostrar la información del clima
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
    // Limpia el contenido existente
    container.innerHTML = '';

    // Crea una lista para mostrar el pronóstico extendido
    const forecastListElement = document.createElement('ul');

    forecastList.forEach(forecast => {
        const date = new Date(forecast.dt * 1000); // Convierte la fecha UNIX a milisegundos
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temperature = Math.round(forecast.main.temp - 273.15); // Convierte de Kelvin a Celsius

        // Crea un elemento de lista para cada día
        const listItem = document.createElement('li');
        listItem.textContent = `${day}: ${temperature}°C, ${forecast.weather[0].description}`;

        // Agrega el elemento de lista a la lista principal
        forecastListElement.appendChild(listItem);
    });

    // Agrega la lista al contenedor
    container.appendChild(forecastListElement);
}
