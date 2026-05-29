import listEtiquetas from '../../useCases/etiquetas/listEtiquetas.js';

export default async function list(req, res, next) {
  try {
    const etiquetas = await listEtiquetas();
    res.status(200).json({
      data: etiquetas,
    });
  } catch (error) {
    next(error);
  }
}
