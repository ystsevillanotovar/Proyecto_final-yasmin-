<template>
  <div class="badge" :class="levelClass">
    {{ level.label }}
  </div>
</template>

<script setup>
import { getPrioridadLevel } from '~/utils/prioridad'

const props = defineProps({
  valor: {
    type: Number,
    required: true
  }
})

const level = computed(() => getPrioridadLevel(props.valor))
const levelClass = computed(() => level.value.class)
</script>
