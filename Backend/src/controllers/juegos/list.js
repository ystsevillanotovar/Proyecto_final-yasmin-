import listJuegos from '../../useCases/juegos/listJuegos.js';

export default async function list(req, res, next) {
  try {
    const result = await listJuegos({ usuario_id: req.userSession.id, query: req.query });
    res.status(200).json({
      data: result.items,
      meta: result.meta,
    });
  } catch (error) {
    next(error);
  }
}
