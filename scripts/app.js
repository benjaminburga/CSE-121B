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
    setInterval(createMeteor, 4000);
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
        // Limpiamos la imagen
        document.getElementById('cityImage').src = '';
        // Limpiamos el valor del input
        document.getElementById('cityInput').value = '';
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
