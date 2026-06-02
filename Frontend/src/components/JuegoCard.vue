<template>
  <div
    class="arcade-card group p-5"
    :class="[prioridadLevel.class.replace('upside-down-badge ', 'card-'), { 'ripple-complete': justCompleted }]"
  >
    <div class="flex items-start justify-between gap-3 mb-3">
      <div class="flex-1">
        <div v-if="juego.categoria" class="mb-2">
          <span class="upside-down-badge" :class="categoriaColorClass">{{ juego.categoria.nombre }}</span>
        </div>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <PrioridadBadge :valor="juego.prioridad || 0" />
        <button
          @click="handleComplete"
          :disabled="isCompleting"
          class="complete-btn-stranger"
          :class="isCompleting ? '' : juego.completado ? 'is-completed' : 'not-completed'"
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

    <div class="flex-1 flex items-center justify-center mb-3">
      <NuxtLink
        :to="`/juegos/${juego.id}`"
        class="juego-title text-center hover:text-primary transition-all duration-300 block"
      >
        {{ juego.nombre }}
      </NuxtLink>
    </div>

    <div class="flex flex-wrap gap-2 mb-4 justify-center">
      <span
        v-for="etiqueta in juego.etiquetas"
        :key="etiqueta.id"
        class="inline-flex items-center px-2 py-0.5 rounded text-xs"
        style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.6);border:1px solid rgba(255,255,255,0.1);font-size:0.65rem"
      >
        {{ etiqueta.nombre }}
      </span>
    </div>

    <div class="grid grid-cols-3 gap-3">
      <div class="arcade-stat">
        <p class="stat-value text-primary text-lg">{{ juego.puntuacion_metacritic }}</p>
        <p class="text-text-dim text-xs">Meta</p>
      </div>
      <div class="arcade-stat">
        <p class="stat-value text-text-primary text-lg">{{ juego.horas_dedicacion }}h</p>
        <p class="text-text-dim text-xs">Horas</p>
      </div>
      <div class="arcade-stat" :style="juego.completado ? 'border-color:rgba(255,140,66,0.3);background:rgba(255,140,66,0.08)' : ''">
        <p class="stat-value text-lg" :class="juego.completado ? 'text-accent' : 'text-text-dim'">
          {{ juego.completado ? 'Si' : 'No' }}
        </p>
        <p class="text-text-dim text-xs">Completado</p>
      </div>
    </div>

    <div v-if="juego.completado" class="completed-overlay">
      <div class="flex items-center gap-3">
        <div class="star-rating">
          <span v-for="i in juego.valoracion" :key="i">&#9733;</span>
          <span v-for="i in (5 - (juego.valoracion || 0))" :key="'e'+i" class="empty">&#9733;</span>
        </div>
        <span class="text-xs text-text-dim ghost-text-subtle">{{ formatDate(juego.fecha_completado) }}</span>
      </div>
      <p v-if="juego.notas" class="text-xs text-text-muted mt-2 ghost-text-subtle">{{ juego.notas }}</p>
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
import { formatDate, getPrioridadLevel } from '~/utils/prioridad'

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
const justCompleted = ref(false)

const prioridadLevel = computed(() => getPrioridadLevel(props.juego.prioridad || 0))

const categoriaColorClass = computed(() => {
  const cat = props.juego.categoria?.nombre?.toLowerCase() || ''
  if (['terror', 'horror', 'accion', 'fps', 'shooter'].includes(cat)) return 'alta'
  if (['aventura', 'rpg', 'mundo abierto', 'metroidvania'].includes(cat)) return 'media'
  return 'baja'
})

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

<style scoped>
.juego-title {
  font-family: 'Klein Headline', 'Karma Future', 'Playfair Display', Georgia, serif;
  font-size: 1.35rem;
  font-weight: bold;
  font-style: oblique;
  letter-spacing: 0.05em;
  color: #FDF0E2;
  text-shadow:
    0 0 10px rgba(255, 255, 255, 0.3),
    0 2px 8px rgba(0, 0, 0, 0.8),
    0 0 40px rgba(231, 76, 60, 0.15);
  line-height: 1.3;
}

.juego-title:hover {
  text-shadow:
    0 0 15px rgba(139, 92, 246, 0.6),
    0 2px 8px rgba(0, 0, 0, 0.8),
    0 0 60px rgba(139, 92, 246, 0.2);
}
</style>
