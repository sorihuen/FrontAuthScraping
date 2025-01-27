<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const isDark = ref(false);
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();

const toggleTheme = () => {
    isDark.value = !isDark.value;
}

const handleRegister = async () => {
    // Verificar si las contraseñas coinciden
    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match.");
        return;
    }

    // Datos a enviar
    const userData = {
        username: name.value,
        email: email.value,
        password: password.value
    };

    try {
        // Enviar la solicitud POST al servidor FastAPI
        const response = await axios.post('http://127.0.0.1:8000/users/', userData);
        console.log('Registration successful:', response.data);
        // Redirigir al login después del registro exitoso
        router.push('/');
    } catch (error) {
        console.error('Error during registration:', error);
        alert('Registration failed. Please try again.');
    }lert('Registration failed. Please try again.');
    
}

const goToLogin = () => {
    router.push('/');
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
      <div class="p-6">
        <h2 :class="[
          'text-2xl font-bold text-center mb-4',
          isDark ? 'text-indigo-300' : 'text-purple-700'
        ]">Create Account</h2>
        
        <form @submit.prevent="handleRegister" class="space-y-4">
          <div class="space-y-1">
            <label :for="name" :class="[
              'text-xs font-medium',
              isDark ? 'text-indigo-200' : 'text-purple-600'
            ]">Name</label>
            <input 
              type="text" 
              id="name" 
              v-model="name" 
              required 
              :class="[
                'w-full px-4 py-2 rounded-lg transition duration-300',
                isDark ? 'bg-slate-700 text-white focus:bg-slate-600' : 'bg-purple-50 text-purple-900 focus:bg-purple-100',
                'focus:outline-none focus:ring-2',
                isDark ? 'focus:ring-indigo-400' : 'focus:ring-purple-400'
              ]"
              placeholder="Enter your name"
            >
          </div>
          <div class="space-y-1">
            <label :for="email" :class="[
              'text-xs font-medium',
              isDark ? 'text-indigo-200' : 'text-purple-600'
            ]">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              required 
              :class="[
                'w-full px-4 py-2 rounded-lg transition duration-300',
                isDark ? 'bg-slate-700 text-white focus:bg-slate-600' : 'bg-purple-50 text-purple-900 focus:bg-purple-100',
                'focus:outline-none focus:ring-2',
                isDark ? 'focus:ring-indigo-400' : 'focus:ring-purple-400'
              ]"
              placeholder="Enter your email"
            >
          </div>
          <div class="space-y-1">
            <label :for="password" :class="[
              'text-xs font-medium',
              isDark ? 'text-indigo-200' : 'text-purple-600'
            ]">Password</label>
            <input 
              type="password" 
              id="password" 
              v-model="password" 
              required 
              :class="[
                'w-full px-4 py-2 rounded-lg transition duration-300',
                isDark ? 'bg-slate-700 text-white focus:bg-slate-600' : 'bg-purple-50 text-purple-900 focus:bg-purple-100',
                'focus:outline-none focus:ring-2',
                isDark ? 'focus:ring-indigo-400' : 'focus:ring-purple-400'
              ]"
              placeholder="Enter your password"
            >
          </div>
          <div class="space-y-1">
            <label :for="confirmPassword" :class="[
              'text-xs font-medium',
              isDark ? 'text-indigo-200' : 'text-purple-600'
            ]">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              v-model="confirmPassword" 
              required 
              :class="[
                'w-full px-4 py-2 rounded-lg transition duration-300',
                isDark ? 'bg-slate-700 text-white focus:bg-slate-600' : 'bg-purple-50 text-purple-900 focus:bg-purple-100',
                'focus:outline-none focus:ring-2',
                isDark ? 'focus:ring-indigo-400' : 'focus:ring-purple-400'
              ]"
              placeholder="Confirm your password"
            >
          </div>
          <div>
            <button 
              type="submit" 
              :class="[
                'w-full py-2 px-4 rounded-lg font-medium text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50',
                isDark ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:ring-indigo-400' : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 focus:ring-purple-400'
              ]"
            >
              Register
            </button>
          </div>
        </form>

        <div class="mt-4 text-center">
          <a @click="goToLogin" href="#" :class="[
            'text-sm font-medium cursor-pointer transition-colors duration-300',
            isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-purple-600 hover:text-purple-500'
          ]">Already have an account? Sign in</a>
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
