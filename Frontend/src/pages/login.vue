<template>
  <div class="min-h-screen bg-dark pt-24 pb-16">
    <div class="max-w-md mx-auto px-4 sm:px-6">
      <div class="text-center mb-10">
        <h1 class="text-3xl md:text-4xl font-bold text-text-primary mb-3">Iniciar sesion</h1>
        <p class="text-text-muted">Accede a tu cuenta para gestionar tus juegos.</p>
      </div>

      <div class="card-surface p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="form-floating">
            <input
              id="login-email"
              v-model="form.email"
              type="email"
              placeholder=" "
              :class="{ 'border-danger': errors.email }"
            >
            <label for="login-email">Email</label>
            <p v-if="errors.email" class="mt-1 text-sm text-danger">{{ errors.email }}</p>
          </div>

          <div class="form-floating">
            <input
              id="login-password"
              v-model="form.password"
              type="password"
              placeholder=" "
              :class="{ 'border-danger': errors.password }"
            >
            <label for="login-password">Contrasena</label>
            <p v-if="errors.password" class="mt-1 text-sm text-danger">{{ errors.password }}</p>
          </div>

          <div v-if="loginError" class="p-4 bg-danger/10 border border-danger/20 rounded-lg">
            <p class="text-sm text-danger">{{ loginError }}</p>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="btn-primary w-full py-3.5 rounded-lg text-center font-medium"
          >
            <span v-if="isLoading" class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Iniciando...
            </span>
            <span v-else>Iniciar sesion</span>
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-text-muted text-sm">
            No tienes cuenta?
            <NuxtLink to="/register" class="link font-medium ml-1">Registrate</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { z } from 'zod'

definePageMeta({
  layout: 'auth'
})

const route = useRoute()
const router = useRouter()
const sessionStore = useSessionStore()

if (sessionStore.isAuthenticated) {
  router.push('/')
}

const loginSchema = z.object({
  email: z.string().min(1, 'Email requerido').email('Email no valido'),
  password: z.string().min(1, 'Contrasena requerida')
})

const form = ref({
  email: '',
  password: ''
})

const errors = ref({})
const loginError = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  errors.value = {}
  loginError.value = ''
  isLoading.value = true

  try {
    const result = loginSchema.safeParse(form.value)

    if (!result.success) {
      result.error.issues.forEach((error) => {
        errors.value[error.path[0]] = error.message
      })
      isLoading.value = false
      return
    }

    const { success, error } = await sessionStore.login(form.value.email, form.value.password)

    if (!success) {
      loginError.value = error
      isLoading.value = false
      return
    }

    const redirect = route.query.redirect || '/'
    router.push(redirect)
  } catch (error) {
    loginError.value = 'Error inesperado'
    isLoading.value = false
  }
}

useHead({
  title: 'Login - Stranger Home'
})
</script>
