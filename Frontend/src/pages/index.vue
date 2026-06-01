<template>
  <div>
    <section class="relative min-h-screen flex items-center overflow-hidden sunset-hero-bg sunset-texture">
      <div class="drop-art-collection slow-turning-reversed" style="bottom:-125px;left:-620px;filter:blur(10px)">
        <div class="drop-art" style="border-color:rgba(255,255,255,0.3);left:0;bottom:20px;width:50px;height:50px;border-width:100px;opacity:0.1"></div>
      </div>
      <div class="drop-art-collection slow-turning" style="top:50px;left:-420px;filter:blur(10px)">
        <div class="drop-art" style="border-color:rgba(255,200,87,0.3);left:0;bottom:20px;width:50px;height:50px;border-width:100px;opacity:0.1"></div>
      </div>
      <div class="drop-art-collection slow-turning-reversed" style="top:-100px;right:-300px;filter:blur(12px)">
        <div class="drop-art" style="border-color:rgba(255,107,138,0.3);left:0;bottom:20px;width:60px;height:60px;border-width:80px;opacity:0.12"></div>
      </div>

      <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40"></div>

      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="stranger-spark" style="top:15%;left:10%;animation-delay:0s"></div>
        <div class="stranger-spark" style="top:20%;left:25%;animation-delay:1s"></div>
        <div class="stranger-spark" style="top:10%;right:15%;animation-delay:2s"></div>
        <div class="stranger-spark" style="top:25%;right:30%;animation-delay:0.5s"></div>
        <div class="stranger-spark" style="top:35%;left:8%;animation-delay:1.5s"></div>
        <div class="stranger-spark" style="top:30%;right:10%;animation-delay:2.5s"></div>
        <div class="stranger-spark" style="top:40%;left:50%;animation-delay:3s"></div>
        <div class="stranger-spark" style="top:18%;left:40%;animation-delay:1.8s"></div>
        <div class="stranger-spark" style="top:45%;left:20%;animation-delay:0.8s"></div>
        <div class="stranger-spark" style="top:12%;right:40%;animation-delay:2.2s"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div class="text-center max-w-4xl mx-auto">
          <div class="animate-fade-up mb-8">
            <img src="/logo.svg" alt="Stranger Home" class="logo-animated w-20 h-20 mx-auto mb-6 rounded-2xl" />
          </div>

          <div class="relative inline-block animate-fade-up" style="animation-delay:0.15s">
            <h1 class="text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none mb-2">
              <span class="stranger-title">STRANGER</span>
            </h1>
            <div class="stranger-divider w-48 sm:w-64 md:w-80 mx-auto my-3"></div>
            <h1 class="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] leading-none">
              <span class="stranger-title-gold">HOME</span>
            </h1>
          </div>

          <p class="text-lg md:text-xl text-white/90 mt-8 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up" style="animation-delay:0.3s;text-shadow:0 2px 10px rgba(0,0,0,0.4)">
            Tu gestor de videojuegos. Prioriza que jugar, organiza tu biblioteca y registra tus completados.
          </p>

          <div v-if="!sessionStore.isAuthenticated" class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style="animation-delay:0.45s">
            <NuxtLink to="/register" class="px-8 py-3.5 rounded-xl text-lg font-medium inline-flex items-center gap-2 bg-white text-primary hover:bg-white/90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 stranger-border">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
              Empezar ahora
            </NuxtLink>
            <NuxtLink to="/login" class="px-8 py-3.5 rounded-xl text-lg font-medium border-2 border-white/40 text-white hover:bg-white/10 transition-all backdrop-blur-sm">
              Ya tengo cuenta
            </NuxtLink>
          </div>

          <div v-else class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style="animation-delay:0.45s">
            <NuxtLink to="/juegos" class="px-8 py-3.5 rounded-xl text-lg font-medium inline-flex items-center gap-2 bg-white text-primary hover:bg-white/90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 stranger-border">
              Ver mis juegos
            </NuxtLink>
            <NuxtLink to="/juegos/crear" class="px-8 py-3.5 rounded-xl text-lg font-medium border-2 border-white/40 text-white hover:bg-white/10 transition-all backdrop-blur-sm">
              Agregar juego
            </NuxtLink>
          </div>

          <div class="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto animate-fade-up" style="animation-delay:0.6s">
            <div class="text-center">
              <p class="text-2xl md:text-3xl font-bold text-white mb-1" style="text-shadow:0 0 10px rgba(255,255,255,0.3)">Metacritic</p>
              <p class="text-white/60 text-xs">Puntuaciones</p>
            </div>
            <div class="text-center">
              <p class="text-2xl md:text-3xl font-bold text-white mb-1" style="text-shadow:0 0 10px rgba(255,255,255,0.3)">/ Horas</p>
              <p class="text-white/60 text-xs">Prioridad</p>
            </div>
            <div class="text-center">
              <p class="text-2xl md:text-3xl font-bold text-white mb-1" style="text-shadow:0 0 10px rgba(255,255,255,0.3)">Stars</p>
              <p class="text-white/60 text-xs">Valoracion</p>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-soft">
        <svg class="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>

    <section v-if="showRecommended" class="py-20 hero-section-dark relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-white mb-3">Recomendados para ti</h2>
          <p class="text-white/60">Juegos que deberias jugar a continuacion, ordenados por prioridad</p>
        </div>

        <div v-if="pending" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          <p class="mt-4 text-white/60 text-sm">Cargando recomendaciones...</p>
        </div>

        <div v-else-if="error" class="text-center py-12">
          <p class="text-danger mb-4">{{ error.message || 'Error al cargar' }}</p>
          <button @click="refresh" class="btn-outline px-6 py-2 rounded-lg text-sm">Reintentar</button>
        </div>

        <div v-else-if="!juegos || juegos.length === 0" class="text-center py-16">
          <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-surface border border-border flex items-center justify-center">
            <svg class="w-10 h-10 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4v-3a2 2 0 00-2-2H5z"></path>
            </svg>
          </div>
            <p class="text-text-muted text-lg mb-2">Aun no tienes juegos</p>
            <p class="text-white/40 text-sm mb-8">Agrega tu primer juego para empezar</p>
          <NuxtLink to="/juegos/crear" class="btn-primary px-8 py-3 rounded-xl font-medium inline-flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Crear juego
          </NuxtLink>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <JuegoCard
            v-for="juego in juegos.slice(0, 6)"
            :key="juego.id"
            :juego="juego"
          />
        </div>

        <div v-if="juegos && juegos.length > 6" class="text-center mt-10">
          <NuxtLink to="/juegos" class="btn-outline px-6 py-2.5 rounded-lg text-sm inline-flex items-center gap-2">
            Ver todos los juegos
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section v-if="!sessionStore.isAuthenticated" class="py-20 hero-section-dark relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card-surface-dark p-8 hover:-translate-y-1 transition-all duration-300">
            <div class="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-5">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">Prioriza</h3>
            <p class="text-white/60 text-sm leading-relaxed">Descubre que jugar a continuacion con nuestro algoritmo basado en Metacritic y horas de dedicacion.</p>
          </div>
          <div class="card-surface-dark p-8 hover:-translate-y-1 transition-all duration-300">
            <div class="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-5">
              <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">Registra</h3>
            <p class="text-white/60 text-sm leading-relaxed">Marca juegos como completados con notas, valoracion y fecha automatica.</p>
          </div>
          <div class="card-surface-dark p-8 hover:-translate-y-1 transition-all duration-300">
            <div class="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center mb-5">
              <svg class="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h0a2 2 0 012 2v0a2 2 0 012 2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">Organiza</h3>
            <p class="text-white/60 text-sm leading-relaxed">Filtra, ordena y clasifica tu biblioteca por categorias, etiquetas y estado.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const sessionStore = useSessionStore()

const showRecommended = ref(false)
const pending = ref(false)
const error = ref(null)
const juegos = ref([])
const refresh = async () => {
  error.value = null
  try {
    const { $api } = useNuxtApp()
    const response = await $api('/juegos/recomendados')
    juegos.value = response.data || []
  } catch (e) {
    error.value = e
  }
}

if (sessionStore.isAuthenticated) {
  showRecommended.value = true
  pending.value = true
  refresh()
    .finally(() => { pending.value = false })
}
</script>

<style scoped>
.logo-animated {
  filter: drop-shadow(0 0 15px rgba(231,76,60,0.4));
  animation: logoFloat 4s ease-in-out infinite, logoPulse 4s ease-in-out infinite, logoGlow 4s ease-in-out infinite;
}

@keyframes logoFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes logoPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes logoGlow {
  0%, 100% { filter: drop-shadow(0 0 15px rgba(231,76,60,0.4)); }
  50% { filter: drop-shadow(0 0 35px rgba(231,76,60,0.8)) drop-shadow(0 0 60px rgba(255,107,66,0.4)); }
}

.hero-section-dark {
  background: linear-gradient(180deg, #1a0a0a 0%, #2d0f14 40%, #3B1F12 100%);
}

.card-surface-dark {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(231, 76, 60, 0.15);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.card-surface-dark:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(231, 76, 60, 0.35);
  box-shadow: 0 0 20px rgba(231, 76, 60, 0.15);
}
</style>
