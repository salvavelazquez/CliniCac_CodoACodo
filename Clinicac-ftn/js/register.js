const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
    };

    try {
        const response = await fetch(url, options);  // Realiza la petición fetch
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();  // Devuelve la respuesta en formato JSON
    } catch (error) {
        console.error('Fetch error:', error);
        alert('An error occurred while fetching data. Please try again.');
    }
}

// Evento para manejar el envío del formulario de registro
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();  // Previene el envío del formulario por defecto

    // Obtiene los datos del formulario
    const formData = {
        username: document.getElementById('name').value,
        email: document.getElementById('mail').value,
        password_user: document.getElementById('password').value,
        date_user: document.getElementById('datepicker').value,
        country: document.getElementById('country').value,
        is_admin: document.getElementById('is-admin').value,
    };

    // Llama a la función fetchData para enviar los datos al backend
    const response = await fetchData(`${BASEURL}/api/users/`, 'POST', formData);

    if (response && response.message) {
        alert(response.message);
    }
});
