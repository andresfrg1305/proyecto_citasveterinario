<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <h2 class="form-title">Ingreso al Sistema</h2>

    <BaseInput
      v-model="email"
      type="email"
      label="Correo Electrónico"
      placeholder="tu@email.com"
      required
      icon="mail"
    />

    <BaseInput
      v-model="password"
      type="password"
      label="Contraseña"
      placeholder="••••••••"
      required
      icon="lock"
    />

    <button type="submit" class="submit-btn">
      <span v-if="!loading">Ingresar</span>
      <span v-else class="spinner"></span>
    </button>

    <p class="register-link">
      ¿No tienes cuenta?
      <a @click.prevent="$emit('switch-to-register')">Regístrate aquí</a>
    </p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'

const emit = defineEmits(['submit', 'switch-to-register'])

const email = ref('')
const password = ref('')
const loading = ref(false)

const handleSubmit = () => {
  loading.value = true
  emit('submit', {
    email: email.value,
    password: password.value,
  })
  loading.value = false
}
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1rem;
}

.submit-btn:hover {
  background: #3aa876;
  transform: translateY(-2px);
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.register-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
}

.register-link a {
  color: #42b983;
  cursor: pointer;
  text-decoration: underline;
}
</style>
