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
    'min-h-screen flex items-center justify-center p-4 transition-colors duration-300',
    isDark ? 'bg-slate-900' : 'bg-gradient-to-br from-purple-100 to-indigo-100'
  ]">
    <div :class="[
      'w-full max-w-md overflow-hidden rounded-3xl shadow-2xl transition-all duration-300',
      isDark ? 'bg-slate-800' : 'bg-white'
    ]">
      <div class="p-8">
        <h2 :class="[
          'text-3xl font-bold text-center mb-8',
          isDark ? 'text-indigo-300' : 'text-purple-700'
        ]">Welcome Back</h2>
        
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-2">
            <label :for="email" :class="[
              'text-sm font-medium',
              isDark ? 'text-indigo-200' : 'text-purple-600'
            ]">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              required 
              :class="[
                'w-full px-4 py-3 rounded-lg transition duration-300',
                isDark ? 'bg-slate-700 text-white focus:bg-slate-600' : 'bg-purple-50 text-purple-900 focus:bg-purple-100',
                'focus:outline-none focus:ring-2',
                isDark ? 'focus:ring-indigo-400' : 'focus:ring-purple-400'
              ]"
              placeholder="Enter your email"
            >
          </div>
          <div class="space-y-2">
            <label :for="password" :class="[
              'text-sm font-medium',
              isDark ? 'text-indigo-200' : 'text-purple-600'
            ]">Password</label>
            <input 
              type="password" 
              id="password" 
              v-model="password" 
              required 
              :class="[
                'w-full px-4 py-3 rounded-lg transition duration-300',
                isDark ? 'bg-slate-700 text-white focus:bg-slate-600' : 'bg-purple-50 text-purple-900 focus:bg-purple-100',
                'focus:outline-none focus:ring-2',
                isDark ? 'focus:ring-indigo-400' : 'focus:ring-purple-400'
              ]"
              placeholder="Enter your password"
            >
          </div>
          <div>
            <button 
              type="submit" 
              :class="[
                'w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50',
                isDark ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:ring-indigo-400' : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 focus:ring-purple-400'
              ]"
            >
              Sign In
            </button>
          </div>
        </form>

        <div class="mt-6 text-center">
          <a @click="goToRegister" href="#" :class="[
            'text-sm font-medium cursor-pointer transition-colors duration-300',
            isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-purple-600 hover:text-purple-500'
          ]">Don't have an account? Sign up</a>
        </div>
      </div>
      
      <div :class="[
        'p-4 text-center',
        isDark ? 'bg-slate-700' : 'bg-purple-50'
      ]">
        <button 
          @click="toggleTheme"
          :class="[
            'inline-flex items-center justify-center p-2 rounded-full transition-colors duration-300',
            isDark ? 'bg-slate-600 text-indigo-200 hover:bg-slate-500' : 'bg-white text-purple-700 hover:bg-purple-100'
          ]"
        >
          <span v-if="isDark" class="sr-only">Switch to light mode</span>
          <span v-else class="sr-only">Switch to dark mode</span>
          <svg v-if="isDark" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>

