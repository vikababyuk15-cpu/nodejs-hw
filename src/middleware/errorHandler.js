import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    const errorMessage = err.message || err.name;

    return res.status(err.status).json({
      message: errorMessage
    });
  }
  res.status(500).json({
    message: 'Internal Server Error'
  });
};