import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from '@/components/LoginComponent.vue'
import RegisterComponent from '@/components/RegistrationComponent.vue'
import DatosComponent from '@/components/DatosComponent.vue'

// Definir las rutas
const routes = [
  { path: '/', name: 'LoginComponent', component: LoginComponent },
  { path: '/register', name: 'RegisterComponent', component: RegisterComponent }, 
  { path: '/datos', name: 'DatosComponent', component: DatosComponent }, 
]

// Crear el router
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

