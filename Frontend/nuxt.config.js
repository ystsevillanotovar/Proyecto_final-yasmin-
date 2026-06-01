export default defineNuxtConfig({
  srcDir: 'src/',
  compatibilityDate: '2024-05-22',
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'
    }
  },

  app: {
    head: {
      title: 'Stranger Home - Tu gestor de videojuegos',
      htmlAttrs: {
        lang: 'es'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Stranger Home - Gestiona tu biblioteca de videojuegos, prioriza que jugar y registra tus completados' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap' }
      ]
    }
  },

  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/custom.css',
  ]
})
