export default defineNuxtPlugin(async (nuxtApp) => {
  const sessionStore = useSessionStore()
  const config = useRuntimeConfig()

  let token = null

  if (process.server) {
    const headers = useRequestHeaders(['cookie'])
    if (headers.cookie) {
      const match = headers.cookie.match(/(?:^|; )jwt_session=([^;]*)/)
      if (match) token = decodeURIComponent(match[1])
    }
  } else {
    const match = document.cookie.match(/(?:^|; )jwt_session=([^;]*)/)
    if (match) token = decodeURIComponent(match[1])
  }

  if (!token) return

  sessionStore.token = token

  try {
    await $fetch(`${config.public.apiBaseUrl}/status`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  } catch (error) {
    if (error.statusCode === 401 || error.response?.status === 401) {
      sessionStore.logout()
    }
  }
})
