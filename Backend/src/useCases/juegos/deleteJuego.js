import juegoRepository from '../../repositories/juegoRepository.js';
import juegoTransformer from '../../transformers/juegos/juegoTransformer.js';

export default async function deleteJuego({ id, usuario_id }) {
  await juegoRepository.delete(id, usuario_id);
  return { id };
}
