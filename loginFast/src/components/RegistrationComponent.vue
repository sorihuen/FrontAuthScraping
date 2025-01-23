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
        'min-h-screen transition-colors duration-300 flex items-center justify-center',
        isDark ? 'bg-gray-900' : 'bg-gray-100'
    ]">
        <div :class="[
            'w-full max-w-md p-8 rounded-xl shadow-lg transition-all duration-300',
            isDark ? 'bg-gray-800' : 'bg-white'
        ]">
            <!-- Título y Toggle Theme -->
            <header class="text-center mb-8 relative">
                <button @click="toggleTheme"
                    class="absolute right-0 top-0 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    <span v-if="isDark">🌞</span>
                    <span v-else>🌙</span>
                </button>
                <h1 :class="[
                    'text-3xl font-bold mb-2',
                    isDark ? 'text-gray-100' : 'text-gray-800'
                ]">
                    Register
                </h1>
            </header>

            <!-- Registration Form -->
            <form @submit.prevent="handleRegister" class="space-y-4">
                <div>
                    <label :for="name" :class="[
                        'block text-sm font-medium mb-2',
                        isDark ? 'text-gray-300' : 'text-gray-700'
                    ]">Name</label>
                    <input type="text" id="name" v-model="name" required :class="[
                        'w-full px-3 py-2 border rounded-md',
                        isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                    ]">
                </div>
                <div>
                    <label :for="email" :class="[
                        'block text-sm font-medium mb-2',
                        isDark ? 'text-gray-300' : 'text-gray-700'
                    ]">Email</label>
                    <input type="email" id="email" v-model="email" required :class="[
                        'w-full px-3 py-2 border rounded-md',
                        isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                    ]">
                </div>
                <div>
                    <label :for="password" :class="[
                        'block text-sm font-medium mb-2',
                        isDark ? 'text-gray-300' : 'text-gray-700'
                    ]">Password</label>
                    <input type="password" id="password" v-model="password" required :class="[
                        'w-full px-3 py-2 border rounded-md',
                        isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                    ]">
                </div>
                <div>
                    <label :for="confirmPassword" :class="[
                        'block text-sm font-medium mb-2',
                        isDark ? 'text-gray-300' : 'text-gray-700'
                    ]">Confirm Password</label>
                    <input type="password" id="confirmPassword" v-model="confirmPassword" required :class="[
                        'w-full px-3 py-2 border rounded-md',
                        isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                    ]">
                </div>
                <button type="submit"
                    class="w-full py-2 px-4 rounded-md font-medium text-white bg-cyan-500 hover:bg-cyan-600 transition-colors duration-300">
                    Register
                </button>
            </form>

            <p :class="[
                'mt-4 text-center text-sm',
                isDark ? 'text-gray-400' : 'text-gray-600'
            ]">
                Already have an account?
                <a @click="goToLogin" href="#" :class="[
                    'font-medium cursor-pointer',
                    isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                ]">Login here</a>
            </p>
        </div>
    </div>
</template>

<style scoped>

</style>
