<template>
  <div class="register-form">
    <h2 class="form-title">¡Agenda una Cita para tu Mascota!</h2>

    <form @submit.prevent="enviarFormulario">
      <div class="form-group">
        <label for="tipo-animal">Tipo de Animal:</label>
        <select id="tipo-animal" v-model="cita.tipoAnimal" required>
          <option value="">Selecciona...</option>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
          <option value="Ave">Ave</option>
          <option value="Roedor">Roedor</option>
          <option value="Reptil">Reptil</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <div class="form-group">
        <label for="nombre-mascota">Nombre de la Mascota:</label>
        <input type="text" id="nombre-mascota" v-model="cita.nombreMascota" required />
      </div>

      <div class="form-group">
        <label for="edad-mascota">Edad (en años):</label>
        <input type="number" id="edad-mascota" v-model="cita.edadMascota" required />
      </div>

      <div class="form-group">
        <label for="nombre-propietario">Tu Nombre:</label>
        <input type="text" id="nombre-propietario" v-model="cita.nombrePropietario" required />
      </div>

      <div class="form-group">
        <label for="motivo">Motivo de la Cita:</label>
        <textarea id="motivo" v-model="cita.motivoCita" rows="3"></textarea>
      </div>

      <div class="form-group calendar-container">
        <label>Selecciona Fecha y Hora:</label>
        <input type="date" v-model="fechaSeleccionada" :min="hoy" required />
        <select v-model="horaSeleccionada" required>
          <option value="">Selecciona una hora</option>
          <option v-for="hora in horasDisponibles" :key="hora" :value="hora">{{ hora }}</option>
        </select>
      </div>
      
      <button type="submit" class="submit-btn">Agendar Cita</button>
    </form>
    
    <div class="login-link" v-if="enviado">
      <span>¡Cita agendada con éxito! Revisa tu correo.</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useAppointmentStore } from '@/stores/appointment'

const cita = reactive({
  tipoAnimal: '',
  nombreMascota: '',
  edadMascota: null,
  nombrePropietario: '',
  motivoCita: '',
  fechaHoraCita: ''
})

const fechaSeleccionada = ref('')
const horaSeleccionada = ref('')
const enviado = ref(false)

const horasDisponibles = ref([
  '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'
])

const hoy = computed(() => {
  const ahora = new Date()
  const año = ahora.getFullYear()
  const mes = (ahora.getMonth() + 1).toString().padStart(2, '0')
  const dia = ahora.getDate().toString().padStart(2, '0')
  return `${año}-${mes}-${dia}`
})

// STORE para guardar citas
const storeCitas = useAppointmentStore()

const enviarFormulario = () => {
  if (!fechaSeleccionada.value || !horaSeleccionada.value) {
    alert('Por favor, selecciona una fecha y hora para la cita.')
    return
  }

const editarCita = () => {
  if (!fechaSeleccionada.value || !horaSeleccionada.value) {
    alert('Por favor, selecciona una fecha y hora para la cita.')
    return
  }

  cita.fechaHoraCita = `${fechaSeleccionada.value}T${horaSeleccionada.value}:00`
  storeCitas.editarCita({ ...cita }) // Llamamos método del store
  alert('¡Cita actualizada con éxito!')
}

const cancelarCita = () => {
  if (confirm('¿Seguro que quieres cancelar esta cita?')) {
    storeCitas.cancelarCita(cita)
    enviado.value = false
    alert('Cita cancelada.')
  }
}

  cita.fechaHoraCita = `${fechaSeleccionada.value}T${horaSeleccionada.value}:00`

  storeCitas.guardarCita({ ...cita })

  enviado.value = true
}
</script>

<style scoped>
.register-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: #f9f9f9;
}
.form-title {
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
label {
  font-weight: bold;
  color: #555;
}
input, select, textarea {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}
.submit-btn {
  background: #42b983;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.submit-btn:hover {
  background: #36a470;
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
.calendar-container {
  margin-top: 1rem;
}
</style>
