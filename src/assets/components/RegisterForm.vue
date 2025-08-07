<template>
  <form @submit.prevent="handleSubmit" class="register-form">
    <h2 class="form-title">Registro de Usuario</h2>

    <BaseInput
      v-model="formData.name"
      type="text"
      label="Nombre Completo"
      placeholder="Tu nombre"
      required
      icon="person"
    />

    <BaseInput
      v-model="formData.email"
      type="email"
      label="Correo Electrónico"
      placeholder="tu@email.com"
      required
      icon="mail"
    />

    <BaseInput
      v-model="formData.password"
      type="password"
      label="Contraseña"
      placeholder="••••••••"
      required
      icon="lock"
    />

    <div class="form-group">
      <label>Tipo de Usuario</label>
      <div class="radio-group">
        <label>
          <input type="radio" v-model="formData.role" value="owner" checked />
          Dueño de Finca
        </label>
        <label>
          <input type="radio" v-model="formData.role" value="vet" />
          Veterinario
        </label>
      </div>
    </div>

    <button type="submit" class="submit-btn">
      <span v-if="!loading">Registrarse</span>
      <span v-else class="spinner"></span>
    </button>

    <p class="login-link">
      ¿Ya tienes cuenta?
      <a @click.prevent="$emit('switch-to-login')">Inicia sesión aquí</a>
    </p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'

const emit = defineEmits(['submit', 'switch-to-login'])

const formData = ref({
  name: '',
  email: '',
  password: '',
  role: 'owner',
})

const loading = ref(false)

const handleSubmit = () => {
  loading.value = true
  emit('submit', formData.value)
  loading.value = false
}
</script>

<style scoped>
.register-form {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
}

.radio-group {
  display: flex;
  gap: 1rem;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: normal;
  cursor: pointer;
}

.login-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
}

.login-link a {
  color: #42b983;
  cursor: pointer;
  text-decoration: underline;
}
</style>
