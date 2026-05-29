import getJuego from '../../useCases/juegos/getJuego.js';

export default async function get(req, res, next) {
  try {
    const juego = await getJuego({ id: req.params.id, usuario_id: req.userSession.id });
    res.status(200).json({
      data: juego,
    });
  } catch (error) {
    next(error);
  }
}
