<template>
  <div class="card-surface p-6 mb-6">
    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex-1">
        <div class="form-floating">
          <input
            id="filter-nombre"
            v-model="nombre"
            type="text"
            placeholder=" "
            @input="emitFilters"
          >
          <label for="filter-nombre">Buscar por nombre</label>
        </div>
      </div>

      <div class="form-floating">
        <select
          id="filter-sort"
          v-model="sortBy"
          class="cursor-pointer"
          @change="emitFilters"
        >
          <option value="prioridad">Prioridad (desc)</option>
          <option value="-prioridad">Prioridad (asc)</option>
          <option value="-puntuacion_metacritic">Metacritic (desc)</option>
          <option value="puntuacion_metacritic">Metacritic (asc)</option>
          <option value="nombre">Nombre (A-Z)</option>
          <option value="-nombre">Nombre (Z-A)</option>
          <option value="-created_at">Recientes</option>
        </select>
        <label for="filter-sort">Ordenar por</label>
      </div>

      <div class="flex items-end gap-3 pb-2">
        <button
          @click="toggleCompletado"
          class="px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
          :class="completado === null ? 'btn-primary' : completado ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-gray-50 text-text-muted border border-border'"
        >
          Todos
        </button>
        <button
          @click="setCompletado(true)"
          class="px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
          :class="completado === true ? 'btn-primary' : 'bg-gray-50 text-text-muted border border-border hover:border-primary hover:text-primary'"
        >
          Completados
        </button>
        <button
          @click="setCompletado(false)"
          class="px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
          :class="completado === false ? 'btn-primary' : 'bg-gray-50 text-text-muted border border-border hover:border-primary hover:text-primary'"
        >
          En proceso
        </button>
      </div>
    </div>

    <div v-if="categorias && categorias.length" class="mt-4 flex flex-wrap gap-2">
      <button
        @click="setCategoria(null)"
        class="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
        :class="!categoriaId ? 'bg-primary text-white' : 'bg-gray-50 text-text-muted border border-border hover:border-primary hover:text-primary'"
      >
        Todas
      </button>
      <button
        v-for="cat in categorias"
        :key="cat.id"
        @click="setCategoria(cat.id)"
        class="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
        :class="categoriaId === cat.id ? 'bg-primary text-white' : 'bg-gray-50 text-text-muted border border-border hover:border-primary hover:text-primary'"
      >
        {{ cat.nombre }}
      </button>
    </div>

    <div v-if="etiquetas && etiquetas.length" class="mt-3 flex flex-wrap gap-2">
      <button
        v-for="etq in etiquetas"
        :key="etq.id"
        @click="toggleEtiqueta(etq.id)"
        class="px-3 py-1 rounded-full text-xs font-medium transition-all"
        :class="etiquetaIds.includes(etq.id) ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-gray-50 text-text-dim border border-border hover:border-primary/20 hover:text-primary'"
      >
        {{ etq.nombre }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  categorias: { type: Array, default: () => [] },
  etiquetas: { type: Array, default: () => [] },
})

const emit = defineEmits(['filters-change'])

const nombre = ref('')
const sortBy = ref('prioridad')
const completado = ref(null)
const categoriaId = ref(null)
const etiquetaIds = ref([])

const toggleCompletado = () => {
  completado.value = null
  emitFilters()
}

const setCompletado = (val) => {
  completado.value = val
  emitFilters()
}

const setCategoria = (id) => {
  categoriaId.value = id
  emitFilters()
}

const toggleEtiqueta = (id) => {
  const idx = etiquetaIds.value.indexOf(id)
  if (idx > -1) {
    etiquetaIds.value.splice(idx, 1)
  } else {
    etiquetaIds.value.push(id)
  }
  emitFilters()
}

const emitFilters = () => {
  emit('filters-change', {
    nombre: nombre.value,
    sort_by: sortBy.value.replace('-', ''),
    sort_order: sortBy.value.startsWith('-') ? 'desc' : 'asc',
    completado: completado.value,
    categoria_id: categoriaId.value,
    etiqueta_ids: etiquetaIds.value.length ? etiquetaIds.value.join(',') : null,
  })
}
</script>
