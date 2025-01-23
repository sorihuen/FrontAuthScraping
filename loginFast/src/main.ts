import '@/assets/js/tailwind.js'
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index'; // Ajusta la ruta según tu estructura de carpetas

const app = createApp(App);

// Usar el router
app.use(router);

// Montar la aplicación
app.mount('#app');
