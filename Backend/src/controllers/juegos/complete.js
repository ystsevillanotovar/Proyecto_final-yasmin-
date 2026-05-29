import completeJuego from '../../useCases/juegos/completeJuego.js';

export default async function complete(req, res, next) {
  try {
    const juego = await completeJuego({ id: req.params.id, usuario_id: req.userSession.id, body: req.body });
    res.status(200).json({
      data: juego,
    });
  } catch (error) {
    next(error);
  }
}
