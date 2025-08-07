<template>
  <div class="base-input">
    <label v-if="label">{{ label }}</label>
    <div class="input-wrapper">
      <span v-if="icon" class="icon">{{ icon }}</span>
      <input
        :type="type"
        :placeholder="placeholder"
        v-model="inputValue"
        :required="required"
        @input="$emit('update:modelValue', inputValue)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: String,
  type: {
    type: String,
    default: 'text',
  },
  label: String,
  placeholder: String,
  required: Boolean,
  icon: String,
})

const inputValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    inputValue.value = val
  },
)
</script>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.5rem;
  background: #f9f9f9;
}
.icon {
  margin-right: 0.5rem;
  color: #42b983;
}
input {
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  font-size: 1rem;
}
</style>

// Ejemplo para src/stores/auth.js o authStore.js import { ref } from 'vue' export const
useAuthStore = () => { const userRole = ref(null) const login = async (email, password) => { // Aquí
iría la llamada real al backend // Simulación: if (email === 'vet@correo.com') { userRole.value =
'vet' } else { userRole.value = 'owner' } // ...más lógica de login } return { userRole, login } }
