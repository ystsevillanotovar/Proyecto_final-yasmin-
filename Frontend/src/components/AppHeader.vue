<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isScrolled ? 'bg-dark border-b border-border py-3' : 'bg-transparent py-5'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4v-3a2 2 0 00-2-2H5z"></path>
            </svg>
          </div>
          <span class="text-lg font-bold text-text-primary">Stranger Home</span>
        </NuxtLink>

        <div class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="px-4 py-2 text-sm text-text-muted hover:text-primary transition-colors"
            :class="{ 'text-primary': isActive(item.path) }"
          >
            {{ item.label }}
          </NuxtLink>

          <template v-if="!sessionStore.isAuthenticated">
            <div class="w-px h-5 bg-border mx-2"></div>
            <NuxtLink
              to="/login"
              class="px-4 py-2 text-sm text-text-muted hover:text-primary transition-colors"
            >
              Login
            </NuxtLink>
            <NuxtLink
              to="/register"
              class="btn-primary px-5 py-2 rounded-lg text-sm"
            >
              Registrarse
            </NuxtLink>
          </template>

          <div v-else class="relative">
            <button
              @click="toggleUserMenu"
              class="flex items-center gap-2 px-3 py-2 text-sm text-text-muted hover:text-primary transition-colors rounded-lg hover:bg-white/5"
            >
              <div class="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                {{ getUserInitials }}
              </div>
              <span class="hidden lg:inline">{{ sessionStore.user?.alias || 'User' }}</span>
              <svg
                class="w-4 h-4 transition-transform duration-200"
                :class="{ 'rotate-180': userMenuOpen }"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <div
                v-show="userMenuOpen"
                class="absolute right-0 mt-2 w-52 bg-surface border border-border rounded-xl shadow-2xl py-1 overflow-hidden"
              >
                <div class="px-4 py-3 border-b border-border">
                  <p class="text-xs text-text-muted">Sesion activa</p>
                  <p class="text-sm font-medium text-text-primary truncate">{{ sessionStore.user?.alias }}</p>
                  <p class="text-xs text-text-dim truncate">{{ sessionStore.user?.email }}</p>
                </div>
                <button
                  @click="handleLogout"
                  class="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-text-muted hover:text-danger hover:bg-white/5 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  Cerrar sesion
                </button>
              </div>
            </Transition>
          </div>
        </div>

        <div class="md:hidden flex items-center">
          <button
            @click="toggleMobileMenu"
            class="text-text-muted hover:text-primary transition-colors p-2"
          >
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <div
    class="mobile-menu-overlay"
    :class="{ 'open': mobileMenuOpen }"
    @click="closeMobileMenu"
  ></div>

  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <div
      v-show="mobileMenuOpen"
      class="fixed inset-y-0 right-0 w-full max-w-xs bg-surface border-l border-border z-[60] overflow-y-auto"
    >
      <div class="p-6">
        <div class="flex items-center justify-between mb-8">
          <span class="text-lg font-bold text-text-primary">Stranger Home</span>
          <button @click="closeMobileMenu" class="text-text-muted hover:text-primary transition-colors p-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="space-y-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="block px-4 py-3 text-base text-text-muted hover:text-primary hover:bg-white/5 rounded-lg transition-all"
            :class="{ 'text-primary bg-white/5': isActive(item.path) }"
            @click="closeMobileMenu"
          >
            {{ item.label }}
          </NuxtLink>
        </div>

        <div v-if="!sessionStore.isAuthenticated" class="border-t border-border mt-6 pt-6 space-y-3">
          <NuxtLink
            to="/login"
            class="block px-4 py-3 text-text-muted hover:text-primary transition-colors"
            @click="closeMobileMenu"
          >
            Login
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="btn-primary block text-center px-4 py-3 rounded-lg"
            @click="closeMobileMenu"
          >
            Registrarse
          </NuxtLink>
        </div>

        <div v-else class="border-t border-border mt-6 pt-6 space-y-1">
          <div class="px-4 py-3 text-text-muted text-sm">
            {{ sessionStore.user?.alias || 'User' }}
          </div>
          <button
            @click="handleLogout"
            class="block w-full text-left px-4 py-3 text-text-muted hover:text-danger hover:bg-white/5 rounded-lg transition-colors"
          >
            Cerrar sesion
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const sessionStore = useSessionStore()

const mobileMenuOpen = ref(false)
const userMenuOpen = ref(false)
const isScrolled = ref(false)

const navItems = [
  { path: '/', label: 'Inicio' },
  { path: '/juegos', label: 'Juegos' },
  { path: '/completados', label: 'Completados' },
]

const isActive = (path) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

const getUserInitials = computed(() => {
  const name = sessionStore.user?.alias || sessionStore.user?.email || 'U'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
})

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

const handleLogout = () => {
  sessionStore.logout()
  userMenuOpen.value = false
  mobileMenuOpen.value = false
  router.push('/')
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

watch(() => route.path, () => {
  mobileMenuOpen.value = false
  userMenuOpen.value = false
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
