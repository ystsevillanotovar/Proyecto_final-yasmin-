<template>
  <footer class="py-16 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a0808]/95 to-[#0d0404]"></div>
    <div class="absolute inset-0 stranger-footer-glow"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12" v-scroll-reveal="{ direction: 'blur', speed: 'slow' }">
        <img src="/logo.svg" alt="Stranger Home" class="w-16 h-16 mx-auto mb-4 rounded-2xl" style="filter:drop-shadow(0 0 20px rgba(231,76,60,0.6))" />
        <span class="text-2xl font-bold text-white" style="font-family:'Karma Future',sans-serif;letter-spacing:0.05em;text-shadow:0 0 15px rgba(231,76,60,0.5)">STRANGER HOME</span>
        <p class="text-white/50 text-sm mt-3 max-w-md mx-auto leading-relaxed">
          Entre cientos de mundos por recorrer, tú decides quién quieres ser.
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12" v-scroll-reveal="{ direction: 'up' }">
        <div>
          <h3 class="text-xs font-semibold text-white/80 uppercase tracking-widest mb-4">Navegacion</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/" class="text-white/40 hover:text-[#ff6b6b] transition-colors text-sm">Inicio</NuxtLink></li>
            <li><NuxtLink to="/juegos" class="text-white/40 hover:text-[#ff6b6b] transition-colors text-sm">Juegos</NuxtLink></li>
            <li><NuxtLink to="/juegos/crear" class="text-white/40 hover:text-[#ff6b6b] transition-colors text-sm">Crear Juego</NuxtLink></li>
            <li><NuxtLink to="/completados" class="text-white/40 hover:text-[#ff6b6b] transition-colors text-sm">Completados</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h3 class="footer-highlight-title text-xs font-bold uppercase tracking-widest mb-4">Que es esto?</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/que-es-esto" class="footer-highlight-link text-sm inline-flex items-center gap-2">
                <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Descubre Stranger Home
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-xs font-semibold text-white/80 uppercase tracking-widest mb-4">Cuenta</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/login" class="text-white/40 hover:text-[#ff6b6b] transition-colors text-sm">Login</NuxtLink></li>
            <li><NuxtLink to="/register" class="text-white/40 hover:text-[#ff6b6b] transition-colors text-sm">Registrarse</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h3 class="text-xs font-semibold text-white/80 uppercase tracking-widest mb-4">Plataforma</h3>
          <ul class="space-y-2">
            <li class="text-white/40 text-sm">Metacritic</li>
            <li class="text-white/40 text-sm">HowLongToBeat</li>
            <li class="text-white/40 text-sm">Prioridad IA</li>
          </ul>
        </div>

        <div>
          <h3 class="text-xs font-semibold text-white/80 uppercase tracking-widest mb-4">Tecnologia</h3>
          <ul class="space-y-2">
            <li class="text-white/40 text-sm">Nuxt 4</li>
            <li class="text-white/40 text-sm">Vue 3</li>
            <li class="text-white/40 text-sm">Tailwind CSS</li>
            <li class="text-white/40 text-sm">Node.js</li>
          </ul>
        </div>
      </div>

      <div class="stranger-divider mb-8"></div>

      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-xs text-white/30">&copy; 2026 Stranger Home. Todos los derechos reservados.</p>
        <p class="text-xs text-white/30">Hecho con pasion por los videojuegos</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.stranger-footer-glow {
  background: radial-gradient(ellipse at center top, rgba(231, 76, 60, 0.08) 0%, transparent 60%);
}

.footer-highlight-title {
  background: linear-gradient(135deg, #FFD700, #FF6B42, #E74C3C);
  background-size: 200% 200%;
  animation: shimmerTitle 3s linear infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@keyframes shimmerTitle {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

.footer-highlight-link {
  color: #FFD700;
  font-weight: 600;
  transition: all 0.3s ease;
  text-shadow: 0 0 8px rgba(255, 215, 0, 0.4);
}

.footer-highlight-link:hover {
  color: #FF6B42;
  text-shadow: 0 0 15px rgba(255, 107, 66, 0.6);
  transform: translateX(4px);
}
</style>
