import validate from '../../utils/validate.js';
import completeJuegoSchema from '../../validations/juegos/completeJuegoSchema.js';
import juegoRepository from '../../repositories/juegoRepository.js';
import juegoTransformer from '../../transformers/juegos/juegoTransformer.js';

export default async function completeJuego({ id, usuario_id, body }) {
  const data = validate(completeJuegoSchema, body);
  const juego = await juegoRepository.complete(id, usuario_id, data);
  return juegoTransformer(juego);
}
