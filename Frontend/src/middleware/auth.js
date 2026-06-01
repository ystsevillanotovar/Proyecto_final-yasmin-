export default defineNuxtRouteMiddleware((to, from) => {
  const sessionStore = useSessionStore()
  const tokenCookie = useCookie('jwt_session')

  const isAuthenticated = !!tokenCookie.value || sessionStore.isAuthenticated

  if (!isAuthenticated) {
    return navigateTo(`/login?redirect=${to.path}`)
  }
})
