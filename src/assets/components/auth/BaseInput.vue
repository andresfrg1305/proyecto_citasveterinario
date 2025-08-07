<template>
  <div class="input-container">
    <label v-if="label" class="input-label">
      <span v-if="icon" class="material-icons-outlined icon">{{ icon }}</span>
      {{ label }}
    </label>
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :required="required"
      class="input-field"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: [String, Number],
  type: {
    type: String,
    default: 'text',
  },
  label: String,
  placeholder: String,
  required: Boolean,
  icon: String,
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.input-container {
  margin-bottom: 1.5rem;
}

.input-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 8px;
  font-size: 1.1rem;
  color: #42b983;
}

.input-field {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border 0.3s;
}

.input-field:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}
</style>
