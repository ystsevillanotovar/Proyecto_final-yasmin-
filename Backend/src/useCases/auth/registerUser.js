import validate from '../../utils/validate.js';
import registerSchema from '../../validations/auth/registerSchema.js';
import userRepository from '../../repositories/userRepository.js';

export default async function registerUser({ body }) {
  const data = validate(registerSchema, body);
  return await userRepository.create(data);
}
