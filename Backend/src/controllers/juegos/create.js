import createJuego from '../../useCases/juegos/createJuego.js';
import juegoTransformer from '../../transformers/juegos/juegoTransformer.js';

export default async function create(req, res, next) {
  try {
    const juego = await createJuego({ body: req.body, usuario_id: req.userSession.id });
    res.status(201).json({
      data: juegoTransformer(juego),
    });
  } catch (error) {
    next(error);
  }
}
