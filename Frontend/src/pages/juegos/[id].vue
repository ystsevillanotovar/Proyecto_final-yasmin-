<template>
  <div class="min-h-screen bg-dark pt-24 pb-16">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <NuxtLink to="/juegos" class="link text-sm inline-flex items-center gap-1 mb-4">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Volver a juegos
      </NuxtLink>

      <div v-if="juegoPending" class="text-center py-16">
        <div class="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        <p class="mt-4 text-text-muted text-sm">Cargando juego...</p>
      </div>

      <div v-else-if="juegoError" class="text-center py-16">
        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-surface border border-border flex items-center justify-center">
          <span class="text-3xl font-bold text-text-dim">404</span>
        </div>
        <h2 class="text-xl font-bold text-text-primary mb-2">Juego no encontrado</h2>
        <p class="text-text-muted mb-6">El juego que buscas no existe.</p>
        <NuxtLink to="/juegos" class="btn-primary px-6 py-2.5 rounded-lg text-sm">Volver</NuxtLink>
      </div>

      <div v-else-if="juego">
        <div class="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-text-primary mb-2">{{ juego.nombre }}</h1>
            <div class="flex flex-wrap items-center gap-3">
              <span v-if="juego.categoria" class="badge badge-primary">{{ juego.categoria.nombre }}</span>
              <PrioridadBadge :valor="juego.prioridad || 0" />
              <span
                class="badge"
                :class="juego.completado ? 'badge-success' : 'badge-warning'"
              >
                {{ juego.completado ? 'Completado' : 'En proceso' }}
              </span>
            </div>
          </div>
          <button
            @click="handleDelete"
            :disabled="isDeleting"
            class="p-2 rounded-lg transition-colors"
            :class="isDeleting ? 'text-text-dim cursor-wait' : 'text-text-muted hover:text-danger hover:bg-danger/10'"
            title="Eliminar juego"
          >
            <svg v-if="isDeleting" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>

        <div v-if="actionError" class="mb-6 p-4 bg-danger/10 border border-danger/20 rounded-lg">
          <p class="text-sm text-danger">{{ actionError }}</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 space-y-6">
            <div class="card-surface p-6">
              <h3 class="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">Informacion</h3>
              <div class="grid grid-cols-3 gap-4">
                <div class="text-center p-4 rounded-lg bg-primary/5">
                  <p class="stat-value text-2xl" :class="puntuacionLevel.class">{{ juego.puntuacion_metacritic }}</p>
                  <p class="text-text-dim text-xs mt-1">Metacritic</p>
                </div>
                <div class="text-center p-4 rounded-lg bg-accent/5">
                  <p class="stat-value text-text-primary text-2xl">{{ juego.horas_dedicacion }}h</p>
                  <p class="text-text-dim text-xs mt-1">Horas</p>
                </div>
                <div class="text-center p-4 rounded-lg" :class="juego.completado ? 'bg-accent/10' : 'bg-gray-50'">
                  <p class="stat-value text-2xl" :class="juego.completado ? 'text-accent' : 'text-text-muted'">
                    {{ juego.prioridad ? juego.prioridad.toFixed(2) : '0' }}
                  </p>
                  <p class="text-text-dim text-xs mt-1">Prioridad</p>
                </div>
              </div>
            </div>

            <div v-if="juego.etiquetas && juego.etiquetas.length" class="card-surface p-6">
              <h3 class="text-sm font-semibold text-text-primary uppercase tracking-wider mb-3">Etiquetas</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="etq in juego.etiquetas" :key="etq.id" class="badge" style="background:rgba(139,94,60,0.06);color:#8B7355;border:1px solid rgba(139,94,60,0.1)">
                  {{ etq.nombre }}
                </span>
              </div>
            </div>

            <div v-if="juego.completado" class="card-surface p-6 border-accent/20">
              <h3 class="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Registro de completado</h3>
              <div class="flex items-center gap-3 mb-3">
                <div class="star-rating text-lg">
                  <span v-for="i in juego.valoracion" :key="i">&#9733;</span>
                  <span v-for="i in (5 - (juego.valoracion || 0))" :key="'e'+i" class="empty">&#9733;</span>
                </div>
                <span class="text-xs text-text-dim">{{ formatDate(juego.fecha_completado) }}</span>
              </div>
              <p v-if="juego.notas" class="text-text-muted text-sm">{{ juego.notas }}</p>
            </div>

            <div v-if="mode === 'edit'" class="card-surface p-6">
              <h3 class="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">Editar juego</h3>
              <JuegoForm
                :juego="juego"
                :categorias="categorias"
                :etiquetas="etiquetas"
                submit-label="Guardar cambios"
                :on-submit="handleUpdate"
              />
            </div>

            <div v-if="mode === 'completar' || route.query.completar === 'true'" class="card-surface p-6 border-accent/20">
              <h3 class="text-sm font-semibold text-accent uppercase tracking-wider mb-4">Marcar como completado</h3>
              <form @submit.prevent="handleComplete" class="space-y-5">
                <div class="form-floating">
                  <textarea
                    id="completar-notas"
                    v-model="completeForm.notas"
                    rows="3"
                    placeholder=" "
                  ></textarea>
                  <label for="completar-notas">Notas (opcional)</label>
                </div>

                <div>
                  <label class="block text-sm text-text-muted mb-2">Valoracion (1-5)</label>
                  <div class="flex gap-2">
                    <button
                      v-for="i in 5"
                      :key="i"
                      type="button"
                      @click="completeForm.valoracion = i"
                      class="w-10 h-10 rounded-lg text-lg transition-all"
                      :class="i <= completeForm.valoracion ? 'bg-warning text-white' : 'bg-gray-50 text-text-dim hover:border-warning hover:text-warning border border-border'"
                    >
                      &#9733;
                    </button>
                  </div>
                </div>

                <div v-if="completeError" class="p-4 bg-danger/10 border border-danger/20 rounded-lg">
                  <p class="text-sm text-danger">{{ completeError }}</p>
                </div>

                <button
                  type="submit"
                  :disabled="isCompleting"
                  class="btn-primary w-full py-3 rounded-lg text-center font-medium flex items-center justify-center gap-2"
                >
                  <svg v-if="isCompleting" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span v-if="isCompleting">Confirmando...</span>
                  <span v-else>Confirmar completado</span>
                </button>
              </form>
            </div>
          </div>

          <div class="space-y-4">
            <div class="card-surface p-6">
              <h3 class="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">Acciones</h3>
              <div class="space-y-2">
                <button
                  @click="mode = mode === 'edit' ? 'view' : 'edit'"
                  :disabled="isSaving || isDeleting || isCompleting"
                  class="w-full px-4 py-2.5 rounded-lg text-sm text-left transition-all"
                  :class="[
                    mode === 'edit' ? 'bg-primary text-white' : 'bg-gray-50 text-text-muted hover:text-primary hover:bg-primary/5',
                    (isSaving || isDeleting || isCompleting) ? 'opacity-50 cursor-not-allowed' : ''
                  ]"
                >
                  <span class="inline-flex items-center gap-2">
                    <svg v-if="isSaving" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    {{ mode === 'edit' ? 'Cancelando...' : 'Editar juego' }}
                  </span>
                </button>
                <button
                  @click="mode = 'completar'"
                  :disabled="juego.completado || isSaving || isDeleting || isCompleting"
                  class="w-full px-4 py-2.5 rounded-lg text-sm text-left transition-all bg-accent/10 text-accent hover:bg-accent/20"
                  :class="(juego.completado || isSaving || isDeleting || isCompleting) ? 'opacity-50 cursor-not-allowed' : ''"
                >
                  <span class="inline-flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {{ juego.completado ? 'Ya completado' : 'Marcar como completado' }}
                  </span>
                </button>
                <button
                  @click="handleDelete"
                  :disabled="isDeleting || isSaving || isCompleting"
                  class="w-full px-4 py-2.5 rounded-lg text-sm text-left transition-all bg-danger/10 text-danger hover:bg-danger/20"
                  :class="(isDeleting || isSaving || isCompleting) ? 'opacity-50 cursor-not-allowed' : ''"
                >
                  <span class="inline-flex items-center gap-2">
                    <svg v-if="isDeleting" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    {{ isDeleting ? 'Eliminando...' : 'Eliminar juego' }}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppConfirm
        v-model="showDeleteConfirm"
        title="Eliminar juego"
        message="Seguro que quieres eliminar este juego? Esta accion no se puede deshacer."
        confirm-text="Eliminar"
        cancel-text="Cancelar"
        @confirm="confirmDelete"
      />
    </div>
  </div>
</template>

<script setup>
import { formatDate, getPuntuacionLevel } from '~/utils/prioridad'

definePageMeta({
  middleware: 'auth',
  validate: (route) => {
    const id = route.params.id
    return id && id.length > 0
  }
})

const route = useRoute()
const router = useRouter()
const { $api } = useNuxtApp()

const mode = ref(route.query.completar === 'true' ? 'completar' : 'view')
const actionError = ref('')
const isSaving = ref(false)
const isDeleting = ref(false)
const isCompleting = ref(false)
const showDeleteConfirm = ref(false)

const { data: juegoResponse, pending: juegoPending, error: juegoError } = await useAsyncData(
  () => `juego-${route.params.id}`,
  () => $api(`/juegos/${route.params.id}`),
  { server: true }
)

const juego = computed(() => juegoResponse.value?.data || null)
const puntuacionLevel = computed(() => getPuntuacionLevel(juego.value?.puntuacion_metacritic || 0))

const { data: categoriasResponse } = await useAsyncData('categorias-detail', () => $api('/categorias'), { server: true })
const { data: etiquetasResponse } = await useAsyncData('etiquetas-detail', () => $api('/etiquetas'), { server: true })

const categorias = computed(() => categoriasResponse.value?.data || [])
const etiquetas = computed(() => etiquetasResponse.value?.data || [])

const completeForm = ref({
  notas: '',
  valoracion: 0,
})
const completeError = ref('')

if (juego.value && juego.value.completado) {
  completeForm.value.notas = juego.value.notas || ''
  completeForm.value.valoracion = juego.value.valoracion || 0
}

const handleUpdate = async (data) => {
  actionError.value = ''
  isSaving.value = true
  try {
    await $api(`/juegos/${route.params.id}`, {
      method: 'PUT',
      body: data
    })
    router.push('/juegos')
  } catch (error) {
    actionError.value = error.data?.message || error.message || 'Error al actualizar el juego'
  } finally {
    isSaving.value = false
  }
}

const handleComplete = async () => {
  completeError.value = ''
  actionError.value = ''
  isCompleting.value = true
  try {
    await $api(`/juegos/${route.params.id}/completado`, {
      method: 'PATCH',
      body: completeForm.value
    })
    router.push('/juegos')
  } catch (error) {
    completeError.value = error.data?.message || error.message || 'Error al marcar como completado'
  } finally {
    isCompleting.value = false
  }
}

const handleDelete = () => {
  actionError.value = ''
  showDeleteConfirm.value = true
}

const confirmDelete = () => {
  isDeleting.value = true
  $api(`/juegos/${route.params.id}`, {
    method: 'DELETE'
  }).then(() => {
    router.push('/juegos')
  }).catch((error) => {
    actionError.value = 'Error al eliminar el juego. Intenta de nuevo.'
  }).finally(() => {
    isDeleting.value = false
  })
}

useHead(() => ({
  title: juego.value ? `${juego.value.nombre} - Stranger Home` : 'Juego - Stranger Home'
}))
</script>
