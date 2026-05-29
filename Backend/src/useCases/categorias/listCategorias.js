import categoriaRepository from '../../repositories/categoriaRepository.js';

export default async function listCategorias() {
  return await categoriaRepository.findAll();
}
