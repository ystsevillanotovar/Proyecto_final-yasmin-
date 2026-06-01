<template>
  <div class="min-h-screen bg-dark pt-24 pb-16">
    <div class="max-w-2xl mx-auto px-4 sm:px-6">
      <div class="mb-8">
        <NuxtLink to="/juegos" class="link text-sm inline-flex items-center gap-1 mb-4">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Volver a juegos
        </NuxtLink>
        <h1 class="text-2xl md:text-3xl font-bold text-text-primary mb-2">Crear juego</h1>
        <p class="text-text-muted text-sm">Agrega un nuevo videojuego a tu biblioteca</p>
      </div>

      <div v-if="pending" class="text-center py-16">
        <div class="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        <p class="mt-4 text-text-muted text-sm">Cargando...</p>
      </div>

      <div v-else>
        <JuegoForm
          :categorias="categorias"
          :etiquetas="etiquetas"
          submit-label="Crear juego"
          :success-message="successMessage"
          @submit="handleCreate"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { z } from 'zod'

definePageMeta({
  middleware: 'auth'
})

const router = useRouter()
const { $api } = useNuxtApp()

const { data: categoriasResponse, pending } = await useAsyncData('categorias-crear', () => $api('/categorias'), { server: true })
const { data: etiquetasResponse } = await useAsyncData('etiquetas-crear', () => $api('/etiquetas'), { server: true })

const categorias = computed(() => categoriasResponse.value?.data || [])
const etiquetas = computed(() => etiquetasResponse.value?.data || [])

const successMessage = ref('')

const handleCreate = async (data) => {
  try {
    await $api('/juegos', {
      method: 'POST',
      body: data
    })

    successMessage.value = 'Juego creado correctamente'
    setTimeout(() => {
      router.push('/juegos')
    }, 500)
  } catch (error) {
    throw error
  }
}

useHead({
  title: 'Crear Juego - Stranger Home'
})
</script>
