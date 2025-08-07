<template>
  <form @submit.prevent="handleSubmit" class="register-form">
    <h2 class="form-title">Registro</h2>

    <input v-model="name" type="text" placeholder="Nombre completo" required />
    <input v-model="email" type="email" placeholder="Correo electrónico" required />
    <input v-model="password" type="password" placeholder="Contraseña" required />

    <select v-model="role" required>
      <option disabled value="">Selecciona un rol</option>
      <option value="owner">Dueño</option>
      <option value="vet">Veterinario</option>
    </select>

    <button type="submit" class="submit-btn">Registrarse</button>

    <p class="login-link">
      ¿Ya tienes cuenta?
      <a @click.prevent="$emit('switch-to-login')">Inicia sesión aquí</a>
    </p>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit', 'switch-to-login'])

const name = ref('')
const email = ref('')
const password = ref('')
const role = ref('')

const handleSubmit = () => {
  emit('submit', {
    name: name.value,
    email: email.value,
    password: password.value,
    role: role.value,
  })
}
</script>

<style scoped>
.register-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-title {
  text-align: center;
  margin-bottom: 1rem;
}
.submit-btn {
  background: #42b983;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  cursor: pointer;
}
.login-link {
  text-align: center;
  margin-top: 1rem;
}
.login-link a {
  color: #42b983;
  cursor: pointer;
  text-decoration: underline;
}
</style>
