import validate from '../../utils/validate.js';
import createJuegoSchema from '../../validations/juegos/createJuegoSchema.js';
import juegoRepository from '../../repositories/juegoRepository.js';
import categoriaRepository from '../../repositories/categoriaRepository.js';
import etiquetaRepository from '../../repositories/etiquetaRepository.js';
import NotFoundError from '../../errors/NotFoundError.js';
import ConflictError from '../../errors/ConflictError.js';
export default async function createJuego({ body, usuario_id }) {
  const data = validate(createJuegoSchema, body);

  await categoriaRepository.findById(data.categoria_id);

  if (data.etiqueta_ids?.length) {
    const etiquetas = await etiquetaRepository.findByIds(data.etiqueta_ids);
    if (etiquetas.length !== data.etiqueta_ids.length) {
      throw new NotFoundError('One or more etiquetas not found');
    }
  }

  const exists = await juegoRepository.findByNombreAndUsuario(data.nombre, usuario_id);
  if (exists) {
    throw new ConflictError('Ya tienes un juego con ese nombre');
  }

  return await juegoRepository.create({ ...data, usuario_id });
}
