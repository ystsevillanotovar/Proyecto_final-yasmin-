export const calcPrioridad = (puntuacionMetacritic, horasDedicacion) => {
  if (!puntuacionMetacritic || !horasDedicacion || horasDedicacion === 0) return 0
  return Math.round((puntuacionMetacritic / horasDedicacion) * 100) / 100
}

export const getPuntuacionLevel = (puntuacion) => {
  if (puntuacion >= 60) return { label: 'ALTA', class: 'upside-down-badge alta' }
  if (puntuacion >= 40) return { label: 'MEDIA', class: 'upside-down-badge media' }
  return { label: 'BAJA', class: 'upside-down-badge baja' }
}

export const getPrioridadLevel = (prioridad) => {
  if (prioridad >= 2) return { label: 'ALTA', class: 'upside-down-badge alta' }
  if (prioridad >= 1) return { label: 'MEDIA', class: 'upside-down-badge media' }
  return { label: 'BAJA', class: 'upside-down-badge baja' }
}

export const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const formatStars = (valoracion) => {
  if (!valoracion) return { filled: 0, empty: 5 }
  return { filled: valoracion, empty: 5 - valoracion }
}
