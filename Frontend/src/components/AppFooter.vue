<template>
  <footer class="bg-darker border-t border-border py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4v-3a2 2 0 00-2-2H5z"></path>
              </svg>
            </div>
            <span class="text-lg font-bold text-text-primary">Stranger Home</span>
          </div>
          <p class="text-text-muted text-sm leading-relaxed">
            Tu gestor de videojuegos. Prioriza que jugar, organiza tu biblioteca y registra tus completados.
          </p>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">Navegacion</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/" class="text-text-muted hover:text-primary transition-colors text-sm">Inicio</NuxtLink></li>
            <li><NuxtLink to="/juegos" class="text-text-muted hover:text-primary transition-colors text-sm">Juegos</NuxtLink></li>
            <li><NuxtLink to="/juegos/crear" class="text-text-muted hover:text-primary transition-colors text-sm">Crear Juego</NuxtLink></li>
            <li><NuxtLink to="/completados" class="text-text-muted hover:text-primary transition-colors text-sm">Completados</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">Cuenta</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/login" class="text-text-muted hover:text-primary transition-colors text-sm">Login</NuxtLink></li>
            <li><NuxtLink to="/register" class="text-text-muted hover:text-primary transition-colors text-sm">Registrarse</NuxtLink></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-xs text-text-dim">&copy; 2026 Stranger Home. Todos los derechos reservados.</p>
        <p class="text-xs text-text-dim">Hecho con Nuxt 4 + Vue 3 + Tailwind CSS</p>
      </div>
    </div>
  </footer>
</template>
