import juegoRepository from '../../repositories/juegoRepository.js';
import juegoTransformer from '../../transformers/juegos/juegoTransformer.js';

export default async function listRecomendados({ usuario_id }) {
  const juegos = await juegoRepository.findRecomendados(usuario_id);
  return juegos.map(juego => {
    const transformed = juegoTransformer(juego);
    return { ...transformed, prioridad: transformed.prioridad };
  }).sort((a, b) => b.prioridad - a.prioridad);
}
