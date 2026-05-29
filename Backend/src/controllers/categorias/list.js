import listCategorias from '../../useCases/categorias/listCategorias.js';

export default async function list(req, res, next) {
  try {
    const categorias = await listCategorias();
    res.status(200).json({
      data: categorias,
    });
  } catch (error) {
    next(error);
  }
}
