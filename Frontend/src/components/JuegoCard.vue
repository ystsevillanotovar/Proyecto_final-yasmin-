<template>
  <div class="card-surface p-5 group transition-all duration-300 hover:border-primary/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
    <div class="flex items-start justify-between gap-3 mb-3">
      <div>
        <div v-if="juego.categoria" class="mb-2">
          <span class="badge badge-primary">{{ juego.categoria.nombre }}</span>
        </div>
        <h3 class="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors">
          {{ juego.nombre }}
        </h3>
      </div>
      <PrioridadBadge :valor="juego.prioridad || 0" />
    </div>

    <div class="flex flex-wrap gap-2 mb-4">
      <span v-for="etiqueta in juego.etiquetas" :key="etiqueta.id" class="badge" style="background:rgba(255,255,255,0.04);color:#888;border:1px solid rgba(255,255,255,0.06);font-size:0.65rem">
        {{ etiqueta.nombre }}
      </span>
    </div>

    <div class="grid grid-cols-3 gap-3 mb-4">
      <div class="text-center p-2 rounded-lg bg-white/[0.02]">
        <p class="stat-value text-primary text-lg">{{ juego.puntuacion_metacritic }}</p>
        <p class="text-text-dim text-xs">Metacritic</p>
      </div>
      <div class="text-center p-2 rounded-lg bg-white/[0.02]">
        <p class="stat-value text-text-primary text-lg">{{ juego.horas_dedicacion }}h</p>
        <p class="text-text-dim text-xs">Horas</p>
      </div>
      <div class="text-center p-2 rounded-lg" :class="juego.completado ? 'bg-accent/10' : 'bg-white/[0.02]'">
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

    <div class="flex items-center gap-2">
      <NuxtLink
        :to="`/juegos/${juego.id}`"
        class="btn-outline flex-1 py-2 rounded-lg text-sm text-center"
      >
        Ver detalle
      </NuxtLink>
      <button
        @click="handleComplete"
        class="py-2 px-3 rounded-lg text-sm transition-colors"
        :class="juego.completado ? 'text-accent hover:bg-accent/10' : 'text-text-muted hover:text-primary hover:bg-primary/10'"
        :title="juego.completado ? 'Desmarcar completado' : 'Marcar completado'"
      >
        <svg class="w-5 h-5" :class="juego.completado ? 'text-accent' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </button>
    </div>
  </div>
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

const handleComplete = async () => {
  if (props.juego.completado) {
    if (!confirm('Desmarcar como completado?')) return
    try {
      const { $api } = useNuxtApp()
      await $api(`/juegos/${props.juego.id}/completado`, {
        method: 'PATCH',
        body: { notas: null, valoracion: null }
      })
      router.go(0)
    } catch (e) {
      console.error(e)
    }
  } else {
    router.push(`/juegos/${props.juego.id}?completar=true`)
  }
}
</script>
