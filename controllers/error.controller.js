const AppError = require('../utils/appError');

/**
 * Toma un objeto de error y un objeto de respuesta como argumentos, y devuelve una respuesta JSON con
 * el código de estado, el estado, el error, el mensaje y las propiedades de la pila.
 * @param err - el objeto de error
 * @param res - El objeto de respuesta
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
 * Si el error es operativo, envíe el mensaje de error y el código de estado al cliente. Si el error no
 * es operativo, enviar un mensaje de error genérico al cliente
 * @param err - el objeto de error
 * @param res - El objeto de respuesta que usaremos para devolver el error al cliente.
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

/**
 * Devuelve una nueva instancia de la clase AppError con un mensaje y un código de estado.
 * @returns Una nueva instancia de AppError con el mensaje y el código de estado.
 */

const handleCastError22P02 = () => {
  const message = 'Some type of data send does not match was expected';
  return new AppError(message, 400);
};

const handleJWTError = () => {
  const message = 'Invalid Token, please login againg';
  return new AppError(message, 401);
};

const handleJWTExpiredError = () => {
  const message = 'Your token hes expired! Please login again';
  return new AppError(message, 401);
};

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
    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (error.name === 'TokenExpiredError')
      error = handleJWTExpiredError(error);

    sendErrorProd(error, res);
  }
};

module.exports = globalErrorHandler;
