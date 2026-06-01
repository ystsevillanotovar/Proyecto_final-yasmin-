<template>
  <div class="card-neon p-5 group transition-all duration-300 hover:-translate-y-1">
    <div class="flex items-start justify-between gap-3 mb-3">
      <div class="flex-1">
        <div v-if="juego.categoria" class="mb-2">
          <span class="badge badge-primary">{{ juego.categoria.nombre }}</span>
        </div>
        <NuxtLink
          :to="`/juegos/${juego.id}`"
          class="text-lg font-semibold text-text-primary hover:text-primary transition-colors duration-300"
        >
          {{ juego.nombre }}
        </NuxtLink>
      </div>
      <div class="flex items-center gap-2">
        <PrioridadBadge :valor="juego.prioridad || 0" />
        <button
          @click="handleComplete"
          :disabled="isCompleting"
          class="p-1.5 rounded-lg transition-all duration-300"
          :class="isCompleting ? 'text-text-dim cursor-wait' : juego.completado ? 'text-accent hover:bg-accent/10' : 'text-text-muted hover:text-primary hover:bg-primary/5'"
          :title="juego.completado ? 'Desmarcar completado' : 'Marcar completado'"
        >
          <svg v-if="isCompleting" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </button>
      </div>
    </div>

    <div class="flex flex-wrap gap-2 mb-4">
      <span v-for="etiqueta in juego.etiquetas" :key="etiqueta.id" class="badge" style="background:rgba(139,94,60,0.06);color:#8B7355;border:1px solid rgba(139,94,60,0.1);font-size:0.65rem">
        {{ etiqueta.nombre }}
      </span>
    </div>

    <div class="grid grid-cols-3 gap-3 mb-4">
      <div class="text-center p-2 rounded-lg bg-primary/5">
        <p class="stat-value text-primary text-lg">{{ juego.puntuacion_metacritic }}</p>
        <p class="text-text-dim text-xs">Metacritic</p>
      </div>
      <div class="text-center p-2 rounded-lg bg-accent/5">
        <p class="stat-value text-text-primary text-lg">{{ juego.horas_dedicacion }}h</p>
        <p class="text-text-dim text-xs">Horas</p>
      </div>
      <div class="text-center p-2 rounded-lg" :class="juego.completado ? 'bg-accent/10' : 'bg-gray-50'">
        <p class="stat-value text-lg" :class="juego.completado ? 'text-accent' : 'text-text-muted'">
          {{ juego.completado ? 'Si' : 'No' }}
        </p>
        <p class="text-text-dim text-xs">Completado</p>
      </div>
    </div>

    <div v-if="juego.completado" class="mb-4 p-3 rounded-lg bg-accent/5 border border-accent/10">
      <div class="flex items-center gap-3">
        <div class="star-rating">
          <span v-for="i in juego.valoracion" :key="i">&#9733;</span>
          <span v-for="i in (5 - (juego.valoracion || 0))" :key="'e'+i" class="empty">&#9733;</span>
        </div>
        <span class="text-xs text-text-dim">{{ formatDate(juego.fecha_completado) }}</span>
      </div>
      <p v-if="juego.notas" class="text-xs text-text-muted mt-2">{{ juego.notas }}</p>
    </div>

    <div v-if="actionError" class="mt-3 p-2 bg-danger/10 border border-danger/20 rounded-lg">
      <p class="text-xs text-danger">{{ actionError }}</p>
    </div>
  </div>

  <AppConfirm
    v-model="showUncompleteConfirm"
    title="Desmarcar completado"
    message="Seguro que quieres desmarcar este juego como completado?"
    confirm-text="Desmarcar"
    cancel-text="Cancelar"
    :is-danger="false"
    @confirm="confirmUncomplete"
  />
</template>

<script setup>
import { formatDate } from '~/utils/prioridad'

const props = defineProps({
  juego: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const actionError = ref('')
const isCompleting = ref(false)
const showUncompleteConfirm = ref(false)

const handleComplete = async () => {
  actionError.value = ''
  if (props.juego.completado) {
    showUncompleteConfirm.value = true
  } else {
    router.push(`/juegos/${props.juego.id}?completar=true`)
  }
}

const confirmUncomplete = async () => {
  try {
    isCompleting.value = true
    const { $api } = useNuxtApp()
    await $api(`/juegos/${props.juego.id}/completado`, {
      method: 'PATCH',
      body: { notas: null, valoracion: null }
    })
    router.go(0)
  } catch (e) {
    actionError.value = 'Error al desmarcar como completado. Intenta de nuevo.'
  } finally {
    isCompleting.value = false
  }
}
</script>
