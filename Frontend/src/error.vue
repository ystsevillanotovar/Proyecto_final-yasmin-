<template>
  <div class="min-h-screen bg-dark flex flex-col items-center justify-center">
    <div class="text-center px-4">
      <div v-if="error.statusCode === 404" class="mb-8">
        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-surface flex items-center justify-center">
          <span class="text-4xl font-bold text-text-muted">404</span>
        </div>
        <h1 class="text-3xl font-bold text-text-primary mb-4">Pagina no encontrada</h1>
        <p class="text-text-muted mb-8">{{ error.message || 'La pagina que buscas no existe.' }}</p>
      </div>
      <div v-else class="mb-8">
        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-surface flex items-center justify-center">
          <span class="text-4xl font-bold text-danger">{{ error.statusCode || 500 }}</span>
        </div>
        <h1 class="text-3xl font-bold text-text-primary mb-4">Ha ocurrido un error</h1>
        <p class="text-text-muted mb-8">{{ error.message || 'Algo salio mal.' }}</p>
      </div>
      <button @click="handleError" class="btn-primary px-8 py-3 rounded-lg font-medium">
        Volver al inicio
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>
