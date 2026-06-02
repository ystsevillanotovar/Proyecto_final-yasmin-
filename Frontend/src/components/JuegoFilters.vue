<template>
  <div class="filter-panel-stranger mb-6">
    <div class="flex flex-col md:flex-row gap-4 items-stretch">
      <div class="flex-1">
        <div class="form-floating filter-input-lg">
          <input
            id="filter-nombre"
            v-model="nombre"
            type="text"
            placeholder=" "
            @input="emitFilters"
            class="filter-input"
          >
          <label for="filter-nombre">Buscar por nombre</label>
        </div>
      </div>

      <div class="form-floating filter-input-lg">
        <select
          id="filter-sort"
          v-model="sortBy"
          class="cursor-pointer select-styled filter-input"
          @change="emitFilters"
        >
          <option disabled value="">Ordenar por</option>
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

      <div class="flex items-center gap-2">
        <button
          @click="toggleCompletado"
          class="christmas-light-btn filter-status-btn"
          :class="completado === null ? 'active red' : ''"
        >
          Todos
        </button>
        <button
          @click="setCompletado(true)"
          class="christmas-light-btn filter-status-btn"
          :class="completado === true ? 'active orange' : ''"
        >
          Completados
        </button>
        <button
          @click="setCompletado(false)"
          class="christmas-light-btn filter-status-btn"
          :class="completado === false ? 'active gold' : ''"
        >
          En proceso
        </button>
      </div>
    </div>

    <div class="flex flex-wrap gap-3 mt-5">
      <div class="relative" v-if="categorias && categorias.length">
        <button
          ref="catToggleRef"
          @click.stop="categoriasOpen = !categoriasOpen; etiquetasOpen = false"
          class="christmas-light-btn filter-toggle"
          :class="categoriaId ? 'active red' : ''"
        >
          <span class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 transition-transform duration-200" :class="{ 'rotate-180': categoriasOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
            {{ categoriaLabel }}
          </span>
        </button>
        <Teleport to="body">
          <div
            v-if="categoriasOpen"
            class="filter-dropdown-fixed"
            :style="catDropdownStyle"
            @click.stop
          >
            <div class="christmas-lights p-3">
              <button
                @click="setCategoria(null)"
                class="christmas-light-btn"
                :class="!categoriaId ? 'active red' : ''"
              >
                Todas
              </button>
              <button
                v-for="(cat, idx) in categorias"
                :key="cat.id"
                @click="setCategoria(cat.id)"
                class="christmas-light-btn"
                :class="[
                  categoriaId === cat.id ? 'active' : '',
                  categoriaId === cat.id ? lightColors[idx % lightColors.length] : ''
                ]"
              >
                {{ cat.nombre }}
              </button>
            </div>
          </div>
        </Teleport>
      </div>

      <div class="relative" v-if="etiquetas && etiquetas.length">
        <button
          ref="etqToggleRef"
          @click.stop="etiquetasOpen = !etiquetasOpen; categoriasOpen = false"
          class="christmas-light-btn filter-toggle"
          :class="etiquetaIds.length ? 'active orange' : ''"
        >
          <span class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 transition-transform duration-200" :class="{ 'rotate-180': etiquetasOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
            {{ etiquetasLabel }}
          </span>
        </button>
        <Teleport to="body">
          <div
            v-if="etiquetasOpen"
            class="filter-dropdown-fixed"
            :style="etqDropdownStyle"
            @click.stop
          >
            <div class="christmas-lights p-3">
              <button
                v-for="(etq, idx) in etiquetas"
                :key="etq.id"
                @click="toggleEtiqueta(etq.id)"
                class="christmas-light-btn"
                :class="[
                  etiquetaIds.includes(etq.id) ? 'active' : '',
                  etiquetaIds.includes(etq.id) ? lightColors[idx % lightColors.length] : ''
                ]"
              >
                {{ etq.nombre }}
              </button>
            </div>
          </div>
        </Teleport>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  categorias: { type: Array, default: () => [] },
  etiquetas: { type: Array, default: () => [] },
})

const emit = defineEmits(['filters-change'])

const lightColors = ['red', 'orange', 'gold', 'red', 'orange', 'gold']

const nombre = ref('')
const sortBy = ref('prioridad')
const completado = ref(null)
const categoriaId = ref(null)
const etiquetaIds = ref([])
const categoriasOpen = ref(false)
const etiquetasOpen = ref(false)

const catToggleRef = ref(null)
const etqToggleRef = ref(null)

const getDropdownStyle = (toggleRef) => {
  if (!toggleRef || !process.client) return { top: '0px', left: '0px' }
  const rect = toggleRef.getBoundingClientRect()
  return {
    position: 'fixed',
    top: `${rect.bottom + 6}px`,
    left: `${rect.left}px`,
    minWidth: '200px',
    maxWidth: '320px',
  }
}

const catDropdownStyle = computed(() => getDropdownStyle(catToggleRef.value))
const etqDropdownStyle = computed(() => getDropdownStyle(etqToggleRef.value))

const categoriaLabel = computed(() => {
  if (!categoriaId.value) return 'Categoria'
  const cat = props.categorias.find(c => c.id === categoriaId.value)
  return cat ? cat.nombre : 'Categoria'
})

const etiquetasLabel = computed(() => {
  if (etiquetaIds.value.length === 0) return 'Etiquetas'
  if (etiquetaIds.value.length === 1) {
    const etq = props.etiquetas.find(e => e.id === etiquetaIds.value[0])
    return etq ? etq.nombre : 'Etiquetas'
  }
  return `${etiquetaIds.value.length} seleccionadas`
})

const closeAll = () => {
  categoriasOpen.value = false
  etiquetasOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', closeAll)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeAll)
})

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
  categoriasOpen.value = false
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

<style scoped>
.select-styled option {
  background: #2d0f14;
  color: #FDF0E2;
  padding: 8px;
}

.filter-input-lg {
  height: auto;
}

.filter-input {
  width: 100%;
  padding: 1rem 1rem 0.6rem;
  min-height: 52px;
  font-size: 1rem;
}

.filter-toggle {
  white-space: nowrap;
}

.filter-status-btn {
  padding: 0.6rem 1rem;
  min-height: 52px;
  display: flex;
  align-items: center;
}
</style>

<style>
.filter-dropdown-fixed {
  background: rgba(10, 5, 3, 0.95);
  border: 1px solid rgba(231, 76, 60, 0.25);
  border-radius: 12px;
  z-index: 9999;
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(231, 76, 60, 0.1);
  animation: dropdownIn 0.2s ease;
}

@keyframes dropdownIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
