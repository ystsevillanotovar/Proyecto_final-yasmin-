import juegoRepository from '../../repositories/juegoRepository.js';
import juegoTransformer from '../../transformers/juegos/juegoTransformer.js';

export default async function listJuegos({ usuario_id, query }) {
  const result = await juegoRepository.findAllByUser(usuario_id, {
    page: Number(query.page) || 1,
    perPage: Number(query.per_page) || 10,
    nombre: query.nombre,
    categoria_id: query.categoria_id,
    etiqueta_id: query.etiqueta_id,
    completado: query.completado,
    sortBy: query.sort_by,
    sortOrder: query.sort_order,
  });

  return {
    items: result.items.map(juegoTransformer),
    meta: result.meta,
  };
}
