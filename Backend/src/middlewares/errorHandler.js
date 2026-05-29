import AppError from '../errors/AppError.js'
import ConflictError from '../errors/ConflictError.js'
import ValidationError from '../errors/ValidationError.js'
import NotFoundError from '../errors/NotFoundError.js'
import UnauthorizedError from '../errors/UnauthorizedError.js'
import ForbiddenError from '../errors/ForbiddenError.js'

export default function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }

  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errors: err.errors,
    })
  }

  if (
    err instanceof AppError ||
    err instanceof ConflictError ||
    err instanceof NotFoundError ||
    err instanceof UnauthorizedError ||
    err instanceof ForbiddenError
  ) {
    return res.status(err.statusCode).json({
      message: err.message,
    })
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      message: err.message,
    })
  }

  console.error(err.stack)
  res.status(500).json({ message: 'An unexpected error occurred' })
}
