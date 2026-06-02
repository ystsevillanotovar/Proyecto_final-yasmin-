<template>
  <div class="min-h-screen bg-dark pt-24 pb-16 relative">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="stranger-spark" style="top:10%;left:5%;animation-delay:0s"></div>
      <div class="stranger-spark" style="top:15%;right:8%;animation-delay:1.2s"></div>
      <div class="stranger-spark" style="top:30%;left:15%;animation-delay:2.5s"></div>
      <div class="stranger-spark" style="top:25%;right:20%;animation-delay:0.8s"></div>
      <div class="stranger-spark" style="top:50%;left:8%;animation-delay:1.8s"></div>
      <div class="stranger-spark" style="top:45%;right:12%;animation-delay:3s"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-text-primary ghost-text mb-1">Mis Juegos</h1>
          <p class="ghost-text-subtle text-sm">Gestiona tu biblioteca de videojuegos</p>
          <div class="stranger-divider mt-3" style="width:60px"></div>
        </div>
        <NuxtLink to="/juegos/crear" class="btn-primary px-5 py-2.5 rounded-lg text-sm inline-flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Agregar juego
        </NuxtLink>
      </div>

      <JuegoFilters
        :categorias="categorias"
        :etiquetas="etiquetas"
        @filters-change="handleFiltersChange"
      />

      <div v-if="pending" class="text-center py-16">
        <div class="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        <p class="mt-4 text-text-muted text-sm ghost-text-subtle">Cargando juegos...</p>
      </div>

      <div v-else-if="error" class="empty-state-stranger">
        <p class="text-danger mb-4">{{ error.message || 'Error al cargar' }}</p>
        <button @click="refresh" class="btn-outline px-6 py-2 rounded-lg text-sm">Reintentar</button>
      </div>

      <div v-else-if="!juegos || juegos.length === 0" class="empty-state-stranger">
        <div class="icon-ring">
          <svg class="w-10 h-10 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4v-3a2 2 0 00-2-2H5z"></path>
          </svg>
        </div>
        <p class="ghost-text mb-2 text-lg">No se encontraron juegos</p>
        <p class="ghost-text-subtle text-sm mb-6">Prueba ajustando los filtros o agrega un juego nuevo</p>
        <NuxtLink to="/juegos/crear" class="btn-primary px-6 py-2.5 rounded-lg text-sm">Crear juego</NuxtLink>
      </div>

      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <JuegoCard
            v-for="(juego, index) in juegos"
            :key="juego.id"
            :juego="juego"
            v-scroll-reveal="{ direction: index % 2 === 0 ? 'left' : 'right', delay: (index % 6) * 100 }"
          />
        </div>

        <div v-if="pagination && pagination.total_pages > 1" class="flex justify-center">
          <AppPagination
            :current-page="pagination.current_page"
            :total-pages="pagination.total_pages"
            @page-change="handlePageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const router = useRouter()
const { $api } = useNuxtApp()

const currentFilters = ref({
  nombre: '',
  sort_by: 'prioridad',
  sort_order: 'desc',
  completado: null,
  categoria_id: null,
  etiqueta_ids: null,
})

const currentPage = computed(() => parseInt(route.query.page) || 1)

const { data: juegosResponse, pending, error, refresh } = await useAsyncData(
  () => `juegos-list-${currentPage.value}-${JSON.stringify(currentFilters.value)}`,
  () => {
    const params = new URLSearchParams()
    params.append('page', currentPage.value)
    params.append('per_page', 12)
    if (currentFilters.value.nombre) params.append('nombre', currentFilters.value.nombre)
    if (currentFilters.value.categoria_id) params.append('categoria_id', currentFilters.value.categoria_id)
    if (currentFilters.value.etiqueta_ids) params.append('etiqueta_id', currentFilters.value.etiqueta_ids)
    if (currentFilters.value.completado !== null) params.append('completado', currentFilters.value.completado)
    params.append('sort_by', currentFilters.value.sort_by)
    params.append('sort_order', currentFilters.value.sort_order)
    return $api(`/juegos?${params.toString()}`)
  },
  { watch: [currentPage], server: true }
)

const juegos = computed(() => juegosResponse.value?.data || [])
const pagination = computed(() => juegosResponse.value?.meta?.pagination || null)

const { data: categoriasResponse } = await useAsyncData('categorias-list', () => $api('/categorias'), { server: true })
const { data: etiquetasResponse } = await useAsyncData('etiquetas-list', () => $api('/etiquetas'), { server: true })

const categorias = computed(() => categoriasResponse.value?.data || [])
const etiquetas = computed(() => etiquetasResponse.value?.data || [])

const handleFiltersChange = (filters) => {
  currentFilters.value = filters
  router.push({ path: '/juegos', query: { page: 1 } })
}

const handlePageChange = (page) => {
  router.push({ path: '/juegos', query: { page } })
}

useHead({
  title: 'Mis Juegos - Stranger Home'
})
</script>
