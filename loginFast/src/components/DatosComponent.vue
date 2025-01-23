<script setup>
import { ref } from 'vue';
import axios from 'axios';
import api from '../utils/api'

const isDark = ref(false);
const quotes = ref([]);
const pastelColors = ref([
    "bg-pink-100 border-pink-300",
    "bg-blue-100 border-blue-300",
    "bg-green-100 border-green-300",
    "bg-yellow-100 border-yellow-300",
    "bg-purple-100 border-purple-300",
]);

// Método para alternar el tema
const toggleTheme = () => {
    isDark.value = !isDark.value;
};

// Método para copiar texto al portapapeles
const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        alert("Cita copiada al portapapeles");
    });
};

const fetchQuotes = async () => {
    try {
        const response = await api.get('scrape/list/');
        quotes.value = response.data.map((quote) => ({
            text: quote.quote,
            author: quote.author,
            tags: quote.tags,
        }));
    } catch (error) {
        console.error('Error al obtener las citas:', error.response?.data || error.message);
        alert('Error al obtener las citas. Verifica tu token o la configuración del backend.');
    }
};

fetchQuotes();


</script>

<template>
    <div :class="['min-h-screen p-4 transition-colors duration-300', isDark ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800']">
        <header class="flex justify-between items-center mb-6">
            <h1 :class="['text-3xl font-bold', isDark ? 'text-blue-400' : 'text-blue-600']">Quotes</h1>
            <button 
                @click="toggleTheme"
                class="p-2 rounded-full transition-all duration-300"
                :class="isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'"
                title="Toggle Theme"
            >
                <span v-if="isDark">🌞</span>
                <span v-else>🌙</span>
            </button>
        </header>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="(quote, index) in quotes" :key="index"
                :class="[
                    'relative p-6 rounded-lg shadow-lg border transition-colors duration-300',
                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300',
                    pastelColors[index % pastelColors.length]
                ]">
                <div class="absolute top-3 right-3 cursor-pointer transition"
                    @click="copyToClipboard(quote.text)" title="Copiar cita">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" 
                        :class="isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'" 
                        class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M8 16h8m-8-4h8m-8-4h8m-6 8v2a2 2 0 002 2h6a2 2 0 002-2v-2m-4-4h2a2 2 0 002-2V6a2 2 0 00-2-2h-6a2 2 0 00-2 2v2" />
                    </svg>
                </div>

                <p class="text-lg font-semibold mb-4">
                    {{ quote.text }}
                </p>
                <p class="text-sm mb-4">- {{ quote.author }}</p>

                <div class="flex flex-wrap gap-2 mb-4">
                    <span v-for="tag in quote.tags" :key="tag"
                        class="inline-block text-xs px-3 py-1 rounded-full shadow transition-colors"
                        :class="isDark ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-600'">
                        {{ tag }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
