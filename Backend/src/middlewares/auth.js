import jwt from 'jsonwebtoken';
import bearerToken from 'express-bearer-token';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import ForbiddenError from '../errors/ForbiddenError.js';
import userRepository from '../repositories/userRepository.js';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export const extractBearerToken = bearerToken();

export default function auth({ required = true, roles = [] } = {}) {
  return async (req, res, next) => {
    try {
      const token = req.token;

      if (!token) {
        if (required) {
          throw new UnauthorizedError('Authentication required');
        }
        return next();
      }

      let decoded;
      try {
        decoded = jwt.verify(token, JWT_SECRET);
      } catch {
        throw new UnauthorizedError('Invalid or expired token');
      }

      req.tokenData = decoded;

      const user = await userRepository.findById(decoded.id);
      if (!user || !user.is_active) {
        throw new UnauthorizedError('Invalid or expired token');
      }

      req.userSession = user;

      if (roles.length > 0 && !roles.includes(user.role)) {
        throw new ForbiddenError('Insufficient permissions');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
