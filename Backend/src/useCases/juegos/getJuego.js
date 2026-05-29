import juegoRepository from '../../repositories/juegoRepository.js';
import NotFoundError from '../../errors/NotFoundError.js';
import juegoTransformer from '../../transformers/juegos/juegoTransformer.js';

export default async function getJuego({ id, usuario_id }) {
  const juego = await juegoRepository.findById(id, usuario_id);
  if (!juego) throw new NotFoundError('Juego not found');
  return juegoTransformer(juego);
}
