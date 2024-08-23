import AppError from './appError.js';

function handleCastErrorDB(err) {
  const msg = `Invalid ${err.path}: ${err.value}`;
  return new AppError(msg, 400);
}

function handleDuplicateError(err) {
  const duplicateValues = Object.keys(err.keyPattern).join('|');
  const msg = `${duplicateValues} already exists`;
  return new AppError(msg, 400);
}

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = Object.assign(err);

  if (error.name === 'CastError') error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateError(error);

  res.status(error.statusCode).json({
    request: {
      status: error.status || err.status,
      timestamp: req.requestTime,
    },
    response: {
      message: error.message,
      stack: error.stack,
      error,
    },
  });
};
