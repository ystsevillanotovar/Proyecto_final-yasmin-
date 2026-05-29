import { ZodError } from 'zod';
import ValidationError from '../errors/ValidationError.js';

export default function validate(schema, data) {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.errors.map(err => ({
        path: err.path,
        message: err.message,
      }));
      throw new ValidationError('Validation failed', errors);
    }
    throw error;
  }
}
