import bcrypt from 'bcryptjs';
import validate from '../../utils/validate.js';
import loginSchema from '../../validations/auth/loginSchema.js';
import userRepository from '../../repositories/userRepository.js';
import UnauthorizedError from '../../errors/UnauthorizedError.js';
import { generateToken } from '../../middlewares/auth.js';

export default async function loginUser({ body }) {
  const data = validate(loginSchema, body);

  const user = await userRepository.findByEmail(data.email);
  if (!user) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const isValidPassword = await bcrypt.compare(data.password, user.password);
  if (!isValidPassword) {
    throw new UnauthorizedError('Invalid credentials');
  }

  if (!user.is_active) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const token = generateToken({
    id: user.id,
    role: user.role,
  });

  return { token };
}
