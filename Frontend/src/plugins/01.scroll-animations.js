import vScrollReveal from '../directives/scrollReveal'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('scroll-reveal', vScrollReveal)
})
