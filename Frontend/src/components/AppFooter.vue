<template>
  <footer class="py-16 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a0808]/95 to-[#0d0404]"></div>
    <div class="absolute inset-0 stranger-footer-glow"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <img src="/logo.svg" alt="Stranger Home" class="w-16 h-16 mx-auto mb-4 rounded-2xl" style="filter:drop-shadow(0 0 20px rgba(231,76,60,0.6))" />
        <span class="text-2xl font-bold text-white" style="font-family:'Karma Future',sans-serif;letter-spacing:0.05em;text-shadow:0 0 15px rgba(231,76,60,0.5)">STRANGER HOME</span>
        <p class="text-white/50 text-sm mt-3 max-w-md mx-auto leading-relaxed">
          Tu gestor de videojuegos. Prioriza que jugar, organiza tu biblioteca y registra tus completados.
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
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
</style>
