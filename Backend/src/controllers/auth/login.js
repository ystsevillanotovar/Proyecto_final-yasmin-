import loginUser from '../../useCases/auth/loginUser.js';
import loginTransformer from '../../transformers/auth/loginTransformer.js';

export default async function login(req, res, next) {
  try {
    const result = await loginUser({ body: req.body });
    res.status(200).json({
      data: loginTransformer(result),
    });
  } catch (error) {
    next(error);
  }
}
