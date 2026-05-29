export function calcularPrioridad(puntuacionMetacritic, horasDedicacion) {
  if (!horasDedicacion || horasDedicacion === 0) return 0;
  return puntuacionMetacritic / horasDedicacion;
}

export function toNumber(value) {
  if (typeof value === 'number') return value;
  return Number(value);
}
