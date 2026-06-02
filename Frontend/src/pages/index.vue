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
            Entre cientos de mundos por recorrer, tú decides quién quieres ser.
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

    <div v-if="showRecommended" class="relative">
      <div class="fire-divider-top">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,120 L0,80 C60,75 100,50 140,40 C180,30 200,55 240,60 C280,65 300,30 340,20 C380,10 420,45 460,55 C500,65 520,35 560,25 C600,15 640,50 680,60 C720,70 740,30 780,18 C820,6 860,45 900,55 C940,65 960,35 1000,22 C1040,9 1080,48 1120,58 C1160,68 1180,32 1220,20 C1260,8 1300,45 1340,55 C1380,65 1420,40 1440,30 L1440,120 Z" fill="url(#fireGrad)" opacity="0.6"/>
          <path d="M0,120 L0,90 C80,85 130,60 180,50 C230,40 260,65 300,70 C340,75 380,40 420,30 C460,20 500,55 540,65 C580,75 620,40 660,30 C700,20 740,55 780,65 C820,75 860,40 900,28 C940,16 980,52 1020,62 C1060,72 1100,38 1140,26 C1180,14 1220,50 1260,60 C1300,70 1340,45 1380,35 C1420,25 1440,50 1440,50 L1440,120 Z" fill="url(#fireGrad)" opacity="0.8"/>
          <path d="M0,120 L0,100 C100,95 160,70 220,60 C280,50 320,72 380,78 C440,84 480,55 540,45 C600,35 640,65 700,72 C760,79 800,50 860,40 C920,30 960,62 1020,70 C1080,78 1120,48 1180,38 C1240,28 1280,58 1340,68 C1400,78 1440,55 1440,55 L1440,120 Z" fill="url(#fireGrad)"/>
          <defs>
            <linearGradient id="fireGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#FFD700"/>
              <stop offset="30%" stop-color="#FF8C42"/>
              <stop offset="60%" stop-color="#FF6B42"/>
              <stop offset="100%" stop-color="#E74C3C"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <section class="py-20 fire-section relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12" v-scroll-reveal="'blur'">
            <h2 class="text-3xl font-bold text-white mb-3 fire-title">Recomendados para ti</h2>
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

          <div v-else class="carousel-container" v-scroll-reveal="'up'">
            <div class="carousel-wrapper">
              <div class="carousel-track" ref="carouselTrack">
                <div class="carousel-slide">
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <JuegoCard
                      v-for="juego in juegos"
                      :key="juego.id"
                      :juego="juego"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              v-if="juegos.length > 3"
              @click="carouselPrev"
              class="carousel-btn carousel-btn-left"
              :class="{ 'is-disabled': currentSlide === 0 }"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button
              v-if="juegos.length > 3"
              @click="carouselNext"
              class="carousel-btn carousel-btn-right"
              :class="{ 'is-disabled': currentSlide >= maxSlide }"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>

            <div v-if="juegos.length > 3" class="carousel-dots">
              <button
                v-for="i in totalSlides"
                :key="i"
                @click="goToSlide(i - 1)"
                class="carousel-dot"
                :class="{ active: currentSlide === i - 1 }"
              ></button>
            </div>
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
      <div class="fire-divider-bottom">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 L0,20 C60,25 120,50 180,60 C240,70 280,40 340,30 C400,20 440,55 500,65 C560,75 600,35 660,22 C720,9 760,48 820,58 C880,68 920,30 980,18 C1040,6 1080,42 1140,55 C1200,68 1240,35 1300,22 C1360,9 1400,40 1440,30 L1440,0 Z" fill="url(#fireGradBottom)" opacity="0.6"/>
          <path d="M0,0 L0,30 C80,35 140,55 200,65 C260,75 310,48 370,38 C430,28 470,58 530,68 C590,78 630,42 690,30 C750,18 790,52 850,62 C910,72 950,38 1010,26 C1070,14 1110,50 1170,60 C1230,70 1270,40 1330,28 C1390,16 1440,45 1440,45 L1440,0 Z" fill="url(#fireGradBottom)" opacity="0.8"/>
          <path d="M0,0 L0,10 C100,15 170,40 240,50 C310,60 360,35 430,25 C500,15 540,48 610,58 C680,68 720,38 790,28 C860,18 900,50 970,60 C1040,70 1080,42 1150,32 C1220,22 1260,50 1330,60 C1400,70 1440,40 1440,40 L1440,0 Z" fill="url(#fireGradBottom)"/>
          <defs>
            <linearGradient id="fireGradBottom" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stop-color="#FFD700"/>
              <stop offset="30%" stop-color="#FF8C42"/>
              <stop offset="60%" stop-color="#FF6B42"/>
              <stop offset="100%" stop-color="#E74C3C"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>

    <section v-if="!sessionStore.isAuthenticated" class="py-20 hero-section-dark relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card-surface-dark p-8 hover:-translate-y-1 transition-all duration-300" v-scroll-reveal="{ direction: 'left', delay: 0 }">
            <div class="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-5">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">Prioriza</h3>
            <p class="text-white/60 text-sm leading-relaxed">Descubre que jugar a continuacion con nuestro algoritmo basado en Metacritic y horas de dedicacion.</p>
          </div>
          <div class="card-surface-dark p-8 hover:-translate-y-1 transition-all duration-300" v-scroll-reveal="{ direction: 'up', delay: 150 }">
            <div class="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-5">
              <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">Registra</h3>
            <p class="text-white/60 text-sm leading-relaxed">Marca juegos como completados con notas, valoracion y fecha automatica.</p>
          </div>
          <div class="card-surface-dark p-8 hover:-translate-y-1 transition-all duration-300" v-scroll-reveal="{ direction: 'right', delay: 300 }">
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
const currentSlide = ref(0)
const carouselTrack = ref(null)

const itemsPerSlide = computed(() => {
  if (process.client) {
    if (window.innerWidth >= 1024) return 3
    if (window.innerWidth >= 768) return 2
  }
  return 1
})

const totalSlides = computed(() => Math.ceil(juegos.value.length / itemsPerSlide.value))
const maxSlide = computed(() => totalSlides.value - 1)

const carouselPrev = () => {
  if (currentSlide.value > 0) currentSlide.value--
}

const carouselNext = () => {
  if (currentSlide.value < maxSlide.value) currentSlide.value++
}

const goToSlide = (index) => {
  currentSlide.value = index
}

const updateSlide = () => {
  if (!carouselTrack.value) return
  const percentage = currentSlide.value * itemsPerSlide.value
  carouselTrack.value.style.transform = `translateX(-${percentage * (100 / juegos.value.length)}%)`
}

watch(currentSlide, updateSlide)
watch(juegos, () => { currentSlide.value = 0 }, { deep: true })

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

.fire-section {
  background: linear-gradient(180deg,
    #1a0505 0%,
    #2d0808 10%,
    #4a1010 25%,
    #6b1a0a 40%,
    #8b2500 55%,
    #a03000 65%,
    #7b2000 80%,
    #3d1008 95%,
    #1a0505 100%
  );
  position: relative;
}

.fire-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,140,0,0.15) 0%, transparent 70%);
  pointer-events: none;
}

.fire-section::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 40% at 50% 100%, rgba(255,80,0,0.1) 0%, transparent 70%);
  pointer-events: none;
}

.fire-title {
  text-shadow:
    0 0 10px rgba(255, 100, 0, 0.8),
    0 0 20px rgba(255, 60, 0, 0.5),
    0 0 40px rgba(255, 40, 0, 0.3),
    0 0 80px rgba(200, 30, 0, 0.15);
  animation: fireTitleGlow 2s ease-in-out infinite alternate;
}

@keyframes fireTitleGlow {
  0% {
    text-shadow:
      0 0 10px rgba(255, 100, 0, 0.8),
      0 0 20px rgba(255, 60, 0, 0.5),
      0 0 40px rgba(255, 40, 0, 0.3);
  }
  100% {
    text-shadow:
      0 0 15px rgba(255, 120, 0, 1),
      0 0 30px rgba(255, 80, 0, 0.7),
      0 0 60px rgba(255, 50, 0, 0.4),
      0 0 100px rgba(200, 30, 0, 0.2);
  }
}

.fire-divider-top {
  position: relative;
  width: 100%;
  line-height: 0;
  margin-top: -2px;
}

.fire-divider-top svg {
  width: 100%;
  height: 80px;
  display: block;
}

.fire-divider-bottom {
  position: relative;
  width: 100%;
  line-height: 0;
  margin-bottom: -2px;
}

.fire-divider-bottom svg {
  width: 100%;
  height: 80px;
  display: block;
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

.carousel-container {
  position: relative;
}

.carousel-wrapper {
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.carousel-slide {
  min-width: 100%;
  flex-shrink: 0;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: rgba(231, 76, 60, 0.8);
  color: white;
  border: 1px solid rgba(255, 107, 66, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(231, 76, 60, 0.3);
  backdrop-filter: blur(8px);
}

.carousel-btn:hover {
  background: rgba(231, 76, 60, 1);
  box-shadow: 0 0 25px rgba(231, 76, 60, 0.5);
  transform: translateY(-50%) scale(1.1);
}

.carousel-btn.is-disabled {
  opacity: 0.3;
  cursor: default;
  pointer-events: none;
}

.carousel-btn-left {
  left: -1.25rem;
}

.carousel-btn-right {
  right: -1.25rem;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.carousel-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(231, 76, 60, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.carousel-dot.active {
  background: #E74C3C;
  box-shadow: 0 0 8px rgba(231, 76, 60, 0.6);
  transform: scale(1.3);
}

.carousel-dot:hover:not(.active) {
  background: rgba(255, 107, 66, 0.5);
}
</style>
