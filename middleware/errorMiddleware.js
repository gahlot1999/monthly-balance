export default function errorMiddleware(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Backend Error';
  const extraDetails = err.extraDetails || 'Error from Backend';

  return res.status(status).json({
    request: {
      status: 'error',
      timestamp: req.requestTime,
    },
    response: {
      message,
      extraDetails,
    },
  });
}
