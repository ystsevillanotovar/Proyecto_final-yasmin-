import { defineStore } from 'pinia'

const COOKIE_NAME = 'jwt_session'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30

function setCookie(value) {
  if (process.client) {
    if (value) {
      document.cookie = `${COOKIE_NAME}=${encodeURIComponent(value)}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`
    } else {
      document.cookie = `${COOKIE_NAME}=; max-age=0; path=/; SameSite=Lax`
    }
  }
}

export const useSessionStore = defineStore('session', () => {
  const user = ref(null)
  const token = ref(null)
  const isAuthenticated = computed(() => !!token.value)

  const login = async (email, password) => {
    try {
      const { $api } = useNuxtApp()
      const response = await $api('/auth/login', {
        method: 'POST',
        body: { email, password }
      })

      const { token: authToken, ...userData } = response.data
      setCookie(authToken)
      token.value = authToken
      user.value = userData

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.data?.message || error.message || 'Credenciales incorrectas'
      }
    }
  }

  const register = async (userData) => {
    try {
      const { $api } = useNuxtApp()
      await $api('/auth/register', {
        method: 'POST',
        body: userData
      })

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.data?.message || error.message || 'Error en el registro'
      }
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    setCookie(null)
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout
  }
})
