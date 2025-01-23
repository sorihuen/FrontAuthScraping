<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../utils/api'


const isDark = ref(false);
const email = ref('');
const password = ref('');
const router = useRouter();

const toggleTheme = () => {
  isDark.value = !isDark.value;
}

const handleLogin = async () => {
  if (!email.value || !password.value) {
    alert("Please enter both email and password.");
    return;
  }

  try {
    const response = await api.post('jwtauth/login', {
      email: email.value,
      password: password.value,
    });

    const { access_token } = response.data;

    // Guarda el token en localStorage
    localStorage.setItem('access_token', access_token);

    // Redirige a la página de datos
    router.push('/datos');
    console.log('Login successful:', response.data);
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    alert('Login failed. Please check your credentials and try again.');
  }
};

const goToRegister = () => {
  router.push('/register');
}

</script>

<template>
  <div :class="[
    'min-h-screen transition-colors duration-300 flex items-center justify-center',
    isDark ? 'bg-gray-900' : 'bg-gray-100'
  ]">
    <div :class="[
      'w-full max-w-md p-8 rounded-xl shadow-lg transition-all duration-300',
      isDark ? 'bg-gray-800' : 'bg-white'
    ]">
      <!-- Título y Toggle Theme -->
      <header class="text-center mb-8 relative">
        <button 
          @click="toggleTheme"
          class="absolute right-0 top-0 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          :class="isDark ? 'text-gray-300' : 'text-gray-700'"
        >
          <span v-if="isDark">🌞</span>
          <span v-else>🌙</span>
        </button>
        <h1 :class="[
          'text-3xl font-bold mb-2',
          isDark ? 'text-gray-100' : 'text-gray-800'
        ]">
          Login
        </h1>
      </header>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label :for="email" :class="[
            'block text-sm font-medium mb-2',
            isDark ? 'text-gray-300' : 'text-gray-700'
          ]">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            required 
            :class="[
              'w-full px-3 py-2 border rounded-md',
              isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
            ]"
          >
        </div>
        <div>
          <label :for="password" :class="[
            'block text-sm font-medium mb-2',
            isDark ? 'text-gray-300' : 'text-gray-700'
          ]">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required 
            :class="[
              'w-full px-3 py-2 border rounded-md',
              isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
            ]"
          >
        </div>
        <button 
          type="submit" 
          class="w-full py-2 px-4 rounded-md font-medium text-white bg-cyan-500 hover:bg-cyan-600 transition-colors duration-300"
        >
          Log In
        </button>
      </form>

      <p :class="[
        'mt-4 text-center text-sm',
        isDark ? 'text-gray-400' : 'text-gray-600'
      ]">
        Don't have an account? 
        <a @click="goToRegister" href="#" :class="[
          'font-medium cursor-pointer',
          isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
        ]">Register here</a>
      </p>
    </div>
  </div>
</template>



<style scoped>

</style>

