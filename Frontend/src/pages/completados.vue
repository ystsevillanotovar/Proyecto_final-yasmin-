<template>
  <div class="min-h-screen bg-dark pt-24 pb-16 relative">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="stranger-spark" style="top:12%;left:6%;animation-delay:0.5s"></div>
      <div class="stranger-spark" style="top:20%;right:10%;animation-delay:1.8s"></div>
      <div class="stranger-spark" style="top:40%;left:12%;animation-delay:2.8s"></div>
      <div class="stranger-spark" style="top:35%;right:15%;animation-delay:0.3s"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="mb-8">
        <h1 class="text-2xl md:text-3xl font-bold ghost-text mb-1">Completados</h1>
        <p class="ghost-text-subtle text-sm">Juegos que ya has terminado</p>
        <div class="stranger-divider mt-3" style="width:60px"></div>
      </div>

      <div v-if="pending" class="text-center py-16">
        <div class="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-accent"></div>
        <p class="mt-4 text-text-muted text-sm ghost-text-subtle">Cargando...</p>
      </div>

      <div v-else-if="error" class="empty-state-stranger">
        <p class="text-danger mb-4">{{ error.message || 'Error al cargar' }}</p>
        <button @click="refresh" class="btn-outline px-6 py-2 rounded-lg text-sm">Reintentar</button>
      </div>

      <div v-else-if="!juegos || juegos.length === 0" class="empty-state-stranger">
        <div class="icon-ring">
          <svg class="w-10 h-10 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <p class="ghost-text mb-2 text-lg">Aun no has completado ningun juego</p>
        <p class="ghost-text-subtle text-sm mb-6">Empieza a jugar y registra tus completados</p>
        <NuxtLink to="/juegos" class="btn-primary px-6 py-2.5 rounded-lg text-sm">Ver mis juegos</NuxtLink>
      </div>

      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <JuegoCard
            v-for="juego in juegos"
            :key="juego.id"
            :juego="juego"
            v-scroll-reveal="{ direction: 'up', delay: juegos.indexOf(juego) * 80 }"
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

const currentPage = computed(() => parseInt(route.query.page) || 1)

const { data: completadosResponse, pending, error, refresh } = await useAsyncData(
  () => `completados-page-${currentPage.value}`,
  () => $api(`/juegos?completado=true&sort_by=fecha_completado&sort_order=desc&page=${currentPage.value}&per_page=12`),
  { watch: [currentPage], server: true }
)

const juegos = computed(() => completadosResponse.value?.data || [])
const pagination = computed(() => completadosResponse.value?.meta?.pagination || null)

const handlePageChange = (page) => {
  router.push({ path: '/completados', query: { page } })
}

useHead({
  title: 'Completados - Stranger Home'
})
</script>
