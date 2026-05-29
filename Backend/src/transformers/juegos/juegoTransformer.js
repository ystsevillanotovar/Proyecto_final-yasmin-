import { calcularPrioridad, toNumber } from '../../utils/prioridad.js';

export default function juegoTransformer(juego) {
  const prioridad = calcularPrioridad(
    juego.puntuacion_metacritic,
    toNumber(juego.horas_dedicacion)
  );

  return {
    id: juego.id,
    nombre: juego.nombre,
    categoria: juego.categoria ? {
      id: juego.categoria.id,
      nombre: juego.categoria.nombre,
      slug: juego.categoria.slug,
    } : null,
    etiquetas: juego.etiquetas?.map(je => ({
      id: je.etiqueta.id,
      nombre: je.etiqueta.nombre,
      slug: je.etiqueta.slug,
    })) || [],
    puntuacion_metacritic: juego.puntuacion_metacritic,
    horas_dedicacion: toNumber(juego.horas_dedicacion),
    completado: juego.completado,
    fecha_completado: juego.fecha_completado,
    notas: juego.notas,
    valoracion: juego.valoracion,
    prioridad: Math.round(prioridad * 100) / 100,
    usuario_id: juego.usuario_id,
    created_at: juego.created_at,
    updated_at: juego.updated_at,
  };
}
