import updateJuego from '../../useCases/juegos/updateJuego.js';

export default async function update(req, res, next) {
  try {
    const juego = await updateJuego({ id: req.params.id, usuario_id: req.userSession.id, body: req.body });
    res.status(200).json({
      data: juego,
    });
  } catch (error) {
    next(error);
  }
}
