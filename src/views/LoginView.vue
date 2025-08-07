<template>
  <div class="login-view">
    <div class="background"></div>
    <div class="content">
      <div class="card">
        <LoginForm
          v-if="!showRegister"
          @submit="handleLogin"
          @switch-to-register="showRegister = true"
        />
        <RegisterForm v-else @submit="handleRegister" @switch-to-login="showRegister = false" />
      </div>
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'

const router = useRouter()
const authStore = useAuthStore()

const showRegister = ref(false)
const error = ref(null)

const handleLogin = async ({ email, password }) => {
  try {
    await authStore.login(email, password)
    redirectByRole()
  } catch (err) {
    error.value = err.message
    setTimeout(() => (error.value = null), 5000)
  }
}

const handleRegister = async (userData) => {
  try {
    await authStore.register(userData)
    redirectByRole()
  } catch (err) {
    error.value = err.message
    setTimeout(() => (error.value = null), 5000)
  }
}

const redirectByRole = () => {
  if (authStore.userRole === 'vet') {
    router.push('/vet/dashboard')
  } else {
    router.push('/owner/dashboard')
  }
}
</script>

<style scoped>
.login-view {
  min-height: 100vh;
  display: flex;
  position: relative;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #42b983 0%, #3aa876 100%);
  z-index: 0;
}

.content {
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.card {
  width: 100%;
  max-width: 450px;
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.error-message {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #ffebee;
  color: #c62828;
  border-radius: 8px;
  max-width: 450px;
  width: 100%;
  text-align: center;
}
</style>
