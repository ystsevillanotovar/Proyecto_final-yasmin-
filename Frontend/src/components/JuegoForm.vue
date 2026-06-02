<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="form-floating">
        <input
          id="form-nombre"
          v-model="form.nombre"
          type="text"
          placeholder=" "
          :class="{ 'border-danger': errors.nombre }"
        >
        <label for="form-nombre">Nombre del juego *</label>
        <p v-if="errors.nombre" class="mt-1 text-sm text-danger">{{ errors.nombre }}</p>
      </div>

      <div class="form-floating">
        <select
          id="form-categoria"
          v-model="form.categoria_id"
          class="cursor-pointer select-styled"
          :class="{ 'border-danger': errors.categoria_id }"
        >
          <option value="">Selecciona categoria</option>
          <option v-for="cat in categorias" :key="cat.id" :value="cat.id">{{ cat.nombre }}</option>
        </select>
        <label for="form-categoria">Categoria *</label>
        <p v-if="errors.categoria_id" class="mt-1 text-sm text-danger">{{ errors.categoria_id }}</p>
      </div>

      <div class="form-floating">
        <input
          id="form-metacritic"
          v-model.number="form.puntuacion_metacritic"
          type="number"
          min="0"
          max="100"
          placeholder=" "
          :class="{ 'border-danger': errors.puntuacion_metacritic }"
        >
        <label for="form-metacritic">Puntuacion Metacritic (0-100) *</label>
        <p v-if="errors.puntuacion_metacritic" class="mt-1 text-sm text-danger">{{ errors.puntuacion_metacritic }}</p>
      </div>

      <div class="form-floating">
        <input
          id="form-horas"
          v-model.number="form.horas_dedicacion"
          type="number"
          min="0.1"
          step="0.1"
          placeholder=" "
          :class="{ 'border-danger': errors.horas_dedicacion }"
        >
        <label for="form-horas">Horas de dedicacion *</label>
        <p v-if="errors.horas_dedicacion" class="mt-1 text-sm text-danger">{{ errors.horas_dedicacion }}</p>
      </div>
    </div>

    <div>
      <label class="block text-sm text-text-muted mb-3">Etiquetas</label>
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          v-for="etq in etiquetas"
          :key="etq.id"
          @click="toggleEtiqueta(etq.id)"
          class="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
          :class="form.etiqueta_ids.includes(etq.id) ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-white/[0.02] text-text-dim border border-border hover:border-primary/30 hover:text-primary'"
        >
          {{ etq.nombre }}
        </button>
      </div>
    </div>

    <div v-if="submitError" class="p-4 bg-danger/10 border border-danger/20 rounded-lg">
      <p class="text-sm text-danger">{{ submitError }}</p>
    </div>

    <div v-if="submitSuccess" class="p-4 bg-accent/10 border border-accent/20 rounded-lg">
      <p class="text-sm text-accent flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        {{ successMessage || 'Operacion realizada correctamente' }}
      </p>
    </div>

    <button
      type="submit"
      :disabled="isLoading"
      class="btn-primary w-full py-3 rounded-lg text-center font-medium"
    >
      <span v-if="isLoading" class="flex items-center justify-center gap-2">
        <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ loadingText }}
      </span>
      <span v-else>{{ submitLabel || 'Guardar' }}</span>
    </button>
  </form>
</template>

<script setup>
import { z } from 'zod'

const props = defineProps({
  juego: { type: Object, default: null },
  categorias: { type: Array, default: () => [] },
  etiquetas: { type: Array, default: () => [] },
  submitLabel: { type: String, default: 'Guardar' },
  successMessage: { type: String, default: null },
  onSubmit: { type: Function, default: null },
})

const juegoSchema = z.object({
  nombre: z.string().min(1, 'Nombre requerido'),
  categoria_id: z.string().min(1, 'Categoria requerida'),
  puntuacion_metacritic: z.number().min(0, 'Minimo 0').max(100, 'Maximo 100'),
  horas_dedicacion: z.number().min(0.1, 'Minimo 0.1'),
  etiqueta_ids: z.array(z.string()).optional(),
})

const form = ref({
  nombre: '',
  categoria_id: '',
  puntuacion_metacritic: null,
  horas_dedicacion: null,
  etiqueta_ids: [],
})

const errors = ref({})
const submitError = ref('')
const submitSuccess = ref(false)
const isLoading = ref(false)

if (props.juego) {
  form.value = {
    nombre: props.juego.nombre || '',
    categoria_id: props.juego.categoria_id || '',
    puntuacion_metacritic: props.juego.puntuacion_metacritic || null,
    horas_dedicacion: props.juego.horas_dedicacion || null,
    etiqueta_ids: (props.juego.etiquetas || []).map(e => e.id),
  }
}

const toggleEtiqueta = (id) => {
  const idx = form.value.etiqueta_ids.indexOf(id)
  if (idx > -1) {
    form.value.etiqueta_ids.splice(idx, 1)
  } else {
    form.value.etiqueta_ids.push(id)
  }
}

const loadingText = computed(() => {
  const label = props.submitLabel || 'Guardar'
  if (label.toLowerCase() === 'guardar cambios') return 'Guardando cambios...'
  if (label.toLowerCase() === 'crear juego') return 'Creando juego...'
  return label.replace(/ar$/, 'ando').replace(/er$/, 'iendo') + '...'
})

const handleSubmit = async () => {
  if (isLoading.value) return
  errors.value = {}
  submitError.value = ''
  submitSuccess.value = false
  isLoading.value = true

  try {
    const result = juegoSchema.safeParse(form.value)

    if (!result.success) {
      result.error.issues.forEach((error) => {
        errors.value[error.path[0]] = error.message
      })
      isLoading.value = false
      return
    }

    if (props.onSubmit) {
      await props.onSubmit({
        nombre: form.value.nombre,
        categoria_id: form.value.categoria_id,
        puntuacion_metacritic: Number(form.value.puntuacion_metacritic),
        horas_dedicacion: Number(form.value.horas_dedicacion),
        etiqueta_ids: form.value.etiqueta_ids,
      })
    }

    submitSuccess.value = true
  } catch (error) {
    submitError.value = error?.data?.message || error?.message || 'Error inesperado'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.select-styled option {
  background: #2d0f14;
  color: #FDF0E2;
  padding: 8px;
}
</style>
