import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('vet_user')) || null)
  const token = ref(localStorage.getItem('vet_token') || null)

  const usersDB = {
    'dueno@example.com': {
      password: 'password123',
      name: 'Dueño Ejemplo',
      role: 'owner',
      farm: 'Finca La Esperanza',
    },
    'vet@example.com': {
      password: 'password123',
      name: 'Dr. Pérez',
      role: 'vet',
      specialty: 'Animales mayores',
    },
  }

  const login = (email, password) => {
    const userData = usersDB[email]

    if (!userData || userData.password !== password) {
      throw new Error('Credenciales incorrectas')
    }

    user.value = userData
    token.value = `vet-token-${Date.now()}`

    // Persistir datos
    localStorage.setItem('vet_user', JSON.stringify(userData))
    localStorage.setItem('vet_token', token.value)
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('vet_user')
    localStorage.removeItem('vet_token')
  }

  const register = (userData) => {
    if (usersDB[userData.email]) {
      throw new Error('El usuario ya existe')
    }
    usersDB[userData.email] = userData
    login(userData.email, userData.password)
  }

  const isAuthenticated = computed(() => !!token.value)
  const userRole = computed(() => user.value?.role)

  // Cargar datos al iniciar
  if (!user.value && localStorage.getItem('vet_user')) {
    user.value = JSON.parse(localStorage.getItem('vet_user'))
  }

  return { user, token, login, logout, register, isAuthenticated, userRole }
})
