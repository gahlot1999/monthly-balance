export default function welcome(req, res, next) {
  res.status(200).json({
    request: {
      status: 'success',
      timestamp: req.requestTime,
    },
    response: {
      message: 'Welcome to the Monthly Balance API!',
    },
  });
}
