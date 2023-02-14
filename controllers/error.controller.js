const AppError = require('../utils/appError');

/**
 * It takes an error object and a response object as arguments, and returns a response object with a
 * status code, status, error, message, and stack.
 * @param err - The error object that was thrown.
 * @param res - The response object
 */
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

/**
 * If the error is operational, send the error message and status code to the client. If the error is
 * not operational, send a generic error message to the client
 * @param err - the error object that was thrown
 * @param res - The response object that we are going to send back to the client.
 */
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

const handleCastError22P02 = err => {
  message = 'Some type of data send does not match was expected';
  return new AppError(message, 400);
};
/**
 * If the environment is development, send the error to the client. If the environment is production,
 * send a generic error to the client.
 * @param err - The error object that was thrown.
 * @param req - The request object.
 * @param res - The response object
 * @param next - This is a function that we call if we want to move on to the next middleware.
 */
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }

  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (!error.parent?.code) {
      error = err;
    }

    if (error.parent?.code === '22P02') error = handleCastError22P02(error);

    sendErrorProd(error, res);
  }
};

module.exports = globalErrorHandler;
