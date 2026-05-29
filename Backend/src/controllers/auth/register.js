import registerUser from '../../useCases/auth/registerUser.js';
import userTransformer from '../../transformers/users/userTransformer.js';
import { generateToken } from '../../middlewares/auth.js';

export default async function register(req, res, next) {
  try {
    const user = await registerUser({ body: req.body });
    const transformed = userTransformer(user);
    const token = generateToken({ id: user.id, role: user.role });
    res.status(201).json({
      data: { ...transformed, token },
    });
  } catch (error) {
    next(error);
  }
}
