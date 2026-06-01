<template>
  <div class="flex items-center gap-2">
    <button
      v-if="currentPage > 1"
      @click="goToPage(currentPage - 1)"
      class="w-10 h-10 rounded-lg border border-border text-text-muted hover:border-primary hover:text-primary transition-colors flex items-center justify-center bg-white"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>

    <div class="flex gap-1">
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        class="w-10 h-10 rounded-lg transition-colors font-medium text-sm"
        :class="page === currentPage ? 'bg-primary text-white shadow-md' : 'border border-border text-text-muted hover:border-primary hover:text-primary bg-white'"
      >
        {{ page }}
      </button>
    </div>

    <button
      v-if="currentPage < totalPages"
      @click="goToPage(currentPage + 1)"
      class="w-10 h-10 rounded-lg border border-border text-text-muted hover:border-primary hover:text-primary transition-colors flex items-center justify-center bg-white"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
})

const emit = defineEmits(['page-change'])

const delta = 2

const visiblePages = computed(() => {
  const total = props.totalPages
  const current = props.currentPage
  const range = []
  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    range.push(i)
  }
  return range
})

const goToPage = (page) => {
  emit('page-change', page)
}
</script>
