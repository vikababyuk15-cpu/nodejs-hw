

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;

  res.status(status).json({
    status: status,
    message: err.message || 'Internal Server Error',
    data: err.data || null,
  });
};