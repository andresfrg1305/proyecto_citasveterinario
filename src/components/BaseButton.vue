<template>
  <button
    :type="type"
    :class="['base-button', color, { loading }]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="spinner"></span>
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  color: {
    type: String,
    default: 'primary', // Puedes usar 'primary', 'secondary', etc.
  },
  disabled: Boolean,
  loading: Boolean,
})
</script>

<style scoped>
.base-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  background: #42b983;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.base-button.secondary {
  background: #35495e;
}
.base-button:disabled {
  background: #bdbdbd;
  cursor: not-allowed;
}
.spinner {
  border: 2px solid #fff;
  border-top: 2px solid #42b983;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  margin-right: 8px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
