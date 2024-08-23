export default function sendResponse(
  req,
  res,
  statusCode = 200,
  message = 'Success',
  data = null,
) {
  res.status(statusCode).json({
    request: {
      status: 'success',
      timestamp: req.requestTime,
    },
    response: {
      message,
      data,
    },
  });
}
