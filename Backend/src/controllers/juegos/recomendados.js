import listRecomendados from '../../useCases/juegos/listRecomendados.js';

export default async function recomendados(req, res, next) {
  try {
    const juegos = await listRecomendados({ usuario_id: req.userSession.id });
    res.status(200).json({
      data: juegos,
    });
  } catch (error) {
    next(error);
  }
}
