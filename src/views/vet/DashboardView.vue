<template>
  <div class="vet-dashboard">
    <h2 class="dashboard-title">Citas Programadas</h2>

    <div v-if="citas.length > 0" class="table-container">
      <table class="citas-table">
        <thead>
          <tr>
            <th>Tipo Animal</th>
            <th>Nombre Mascota</th>
            <th>Edad</th>
            <th>Propietario</th>
            <th>Motivo</th>
            <th>Fecha y Hora</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cita, index) in citas" :key="index">
            <td>{{ cita.tipoAnimal }}</td>
            <td>{{ cita.nombreMascota }}</td>
            <td>{{ cita.edadMascota }}</td>
            <td>{{ cita.nombrePropietario }}</td>
            <td>{{ cita.motivoCita }}</td>
            <td>{{ formatearFecha(cita.fechaHoraCita) }}</td>
            <td>
              <select v-model="cita.estado" @change="guardarCambios">
                <option value="pendiente">Pendiente</option>
                <option value="en proceso">En Proceso</option>
                <option value="atendido">Atendido</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="sin-citas">
      <p>No tienes citas pendientes.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const citas = ref([])

onMounted(() => {
  const almacenadas = JSON.parse(localStorage.getItem('vet_citas')) || []
  citas.value = almacenadas
})

const guardarCambios = () => {
  localStorage.setItem('vet_citas', JSON.stringify(citas.value))
}

const formatearFecha = (fechaISO) => {
  const fecha = new Date(fechaISO)
  return fecha.toLocaleString('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
    hour12: false
  })
}
</script>

<style scoped>
.vet-dashboard {
  padding: 2rem;
  max-width: 1000px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}

.dashboard-title {
  text-align: center;
  color: #42b983;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.table-container {
  overflow-x: auto;
}

.citas-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.citas-table th,
.citas-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.citas-table th {
  background-color: #42b983;
  color: white;
  font-weight: 600;
}

.citas-table td select {
  padding: 0.4rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.sin-citas {
  text-align: center;
  color: #777;
  font-size: 1.2rem;
  margin-top: 2rem;
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  border: 1px dashed #ccc;
}
</style>


