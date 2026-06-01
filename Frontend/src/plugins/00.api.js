export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    onRequest({ request, options }) {
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

      if (token) {
        if (!options.headers) {
          options.headers = {}
        } else if (options.headers instanceof Headers) {
          options.headers.set('Authorization', `Bearer ${token}`)
          return
        }
        options.headers.Authorization = `Bearer ${token}`
      }
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        const sessionStore = useSessionStore()
        sessionStore.logout()
        if (process.client) {
          navigateTo('/login')
        }
      }
    }
  })

  return {
    provide: {
      api
    }
  }
})
