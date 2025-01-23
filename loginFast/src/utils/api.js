import axios from 'axios';

// Crea una instancia de Axios
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/', // Ajusta tu base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para incluir el token en las solicitudes
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token'); // Obtén el token del localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Agrega el token al encabezado Authorization
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
