import validate from '../../utils/validate.js';
import updateJuegoSchema from '../../validations/juegos/updateJuegoSchema.js';
import juegoRepository from '../../repositories/juegoRepository.js';
import categoriaRepository from '../../repositories/categoriaRepository.js';
import etiquetaRepository from '../../repositories/etiquetaRepository.js';
import NotFoundError from '../../errors/NotFoundError.js';
import ValidationError from '../../errors/ValidationError.js';
import juegoTransformer from '../../transformers/juegos/juegoTransformer.js';

export default async function updateJuego({ id, usuario_id, body }) {
  const data = validate(updateJuegoSchema, body);

  if (Object.keys(data).length === 0) {
    throw new ValidationError('No fields to update');
  }

  if (data.categoria_id) {
    await categoriaRepository.findById(data.categoria_id);
  }

  if (data.etiqueta_ids) {
    const etiquetas = await etiquetaRepository.findByIds(data.etiqueta_ids);
    if (etiquetas.length !== data.etiqueta_ids.length) {
      throw new NotFoundError('One or more etiquetas not found');
    }
  }

  const juego = await juegoRepository.update(id, usuario_id, data);
  return juegoTransformer(juego);
}
