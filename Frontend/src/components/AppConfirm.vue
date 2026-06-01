<template>
  <Teleport to="body">
    <Transition name="confirm-fade">
      <div v-if="modelValue" class="fixed inset-0 z-[100] flex items-center justify-center p-4" :class="isDanger ? 'bg-red-900/60 backdrop-blur-sm' : 'bg-black/50 backdrop-blur-sm'" @click.self="handleCancel">
        <Transition name="confirm-scale">
          <div v-if="modelValue" class="p-6 w-full max-w-md shadow-2xl" :class="isDanger ? 'bg-white border-2 border-red-500 shadow-red-500/30' : 'card-surface'">
            <div class="flex items-center gap-3 mb-4">
              <div class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" :class="isDanger ? 'bg-red-100' : 'bg-primary/10'">
                <svg class="w-6 h-6" :class="isDanger ? 'text-red-600' : 'text-primary'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold" :class="isDanger ? 'text-red-700' : 'text-text-primary'">{{ title || 'Confirmar accion' }}</h3>
            </div>

            <p class="text-sm mb-6 leading-relaxed" :class="isDanger ? 'text-red-600 font-medium' : 'text-text-muted'">{{ message || 'Seguro que quieres continuar?' }}</p>

            <div class="flex gap-3">
              <button
                @click="handleCancel"
                class="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all bg-gray-100 text-text-muted hover:bg-gray-200"
              >
                {{ cancelText || 'Cancelar' }}
              </button>
              <button
                @click="handleConfirm"
                class="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
                :class="isDanger ? 'btn-danger' : 'btn-primary'"
              >
                {{ confirmText || 'Confirmar' }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: null },
  message: { type: String, default: null },
  confirmText: { type: String, default: null },
  cancelText: { type: String, default: null },
  isDanger: { type: Boolean, default: true },
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const handleConfirm = () => {
  emit('update:modelValue', false)
  emit('confirm')
}

const handleCancel = () => {
  emit('update:modelValue', false)
  emit('cancel')
}
</script>

<style scoped>
.confirm-fade-enter-active,
.confirm-fade-leave-active {
  transition: opacity 0.25s ease;
}
.confirm-fade-enter-from,
.confirm-fade-leave-to {
  opacity: 0;
}

.confirm-scale-enter-active,
.confirm-scale-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.confirm-scale-enter-from,
.confirm-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
