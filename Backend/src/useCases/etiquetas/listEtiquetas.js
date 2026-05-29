import etiquetaRepository from '../../repositories/etiquetaRepository.js';

export default async function listEtiquetas() {
  return await etiquetaRepository.findAll();
}
