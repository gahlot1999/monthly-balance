import AppError from './appError.js';

export default function notFound(req, res, next) {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
}
