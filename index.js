const toggleButton = document.querySelector('.toggle-button');
const mobileMenu = document.querySelector('.navbar-links');

toggleButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});


// Reemplaza 'YOUR_API_KEY' con tu clave de API de Weatherbit
const apiKey = '21ab4e53840b492ca8277dc0b257d02b';

async function obtenerDatosClima() {
    const ubicacion = await obtenerUbicacion();
    if (!ubicacion) return;

    const { lat, lon, ciudad, pais } = ubicacion;

    // Llamada a la API de Weatherbit
    const respuesta = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}&lang=es`);
    const datosClima = await respuesta.json();

    // Actualizar el contenido del cuadro de clima
    const clima = datosClima.data[0];
    document.getElementById('ubicacion').textContent = `${ciudad}, ${pais}`;
    document.getElementById('clima').textContent = `Temperatura: ${clima.temp}°C`;
    document.getElementById('pronostico').textContent = `Condición: ${clima.weather.description}`;
    document.getElementById('calidad-aire').textContent = `Calidad del aire: ${clima.aqi}`;
    document.getElementById('velocidad-viento').textContent = `Viento: ${clima.wind_spd} m/s`;
}

function obtenerUbicacion() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                        .then(response => response.json())
                        .then(data => {
                            const ciudad = data.address.city || data.address.town || data.address.village;
                            const pais = data.address.country;
                            resolve({ lat: latitude, lon: longitude, ciudad, pais });
                        })
                        .catch(error => reject(error));
                },
                error => reject(error)
            );
        } else {
            reject(new Error('Geolocalización no soportada por el navegador.'));
        }
    });
}

function actualizarFechaHora() {
    const ahora = new Date();
    const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const fechaHora = ahora.toLocaleDateString('es-ES', opciones);
    document.getElementById('fecha-hora').textContent = fechaHora;
}

document.addEventListener('DOMContentLoaded', () => {
    obtenerDatosClima();
    actualizarFechaHora();
    setInterval(actualizarFechaHora, 1000); // Actualizar cada segundo
});


