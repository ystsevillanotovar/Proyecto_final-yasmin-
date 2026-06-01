export const calcPrioridad = (puntuacionMetacritic, horasDedicacion) => {
  if (!puntuacionMetacritic || !horasDedicacion || horasDedicacion === 0) return 0
  return Math.round((puntuacionMetacritic / horasDedicacion) * 100) / 100
}

export const getPrioridadLevel = (prioridad) => {
  if (prioridad >= 2) return { label: 'ALTA', class: 'badge-success' }
  if (prioridad >= 1) return { label: 'MEDIA', class: 'badge-warning' }
  return { label: 'BAJA', class: 'badge-danger' }
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
