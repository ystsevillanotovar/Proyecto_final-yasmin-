import deleteJuego from '../../useCases/juegos/deleteJuego.js';

export default async function destroy(req, res, next) {
  try {
    const result = await deleteJuego({ id: req.params.id, usuario_id: req.userSession.id });
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
