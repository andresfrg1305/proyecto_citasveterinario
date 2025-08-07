import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppointmentStore = defineStore('appointments', () => {
  const citas = ref(JSON.parse(localStorage.getItem('vet_citas')) || [])

  const guardarCita = (nuevaCita) => {
    nuevaCita.estado = 'pendiente'
    citas.value.push(nuevaCita)
    localStorage.setItem('vet_citas', JSON.stringify(citas.value))
  }

  const actualizarEstado = (index, nuevoEstado) => {
    citas.value[index].estado = nuevoEstado
    localStorage.setItem('vet_citas', JSON.stringify(citas.value))
  }

  return {
    citas,
    guardarCita,
    actualizarEstado
  }
})
