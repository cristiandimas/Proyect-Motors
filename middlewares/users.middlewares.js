const Users = require('../models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validUserById = catchAsync(async (req, res, next) => {
  /* Obtener la identificación de los parámetros de solicitud y luego buscar un usuario con esa
  identificación y estado disponible. */
  const { id } = req.params;
  const user = await Users.findOne({
    where: {
      id,
      status: 'available',
    },
  });
 /* Comprobando si el usuario existe en la base de datos. */
  if (!user) {
    return next(new AppError('The User was not found', 404));
  }
  req.user = user;
  next();
});

exports.validUserByEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await Users.findOne({
    where: {
      email: email.toLowerCase(),
    },
  });
  req.user = user;
 /* Esta es una validación para verificar si el usuario ya está registrado en la base de datos, pero la
 cuenta está deshabilitada. */
  if (user && user.status === 'unavailable') {
    await user.update({ status: 'available' });
    return next(
      new AppError(
        'El usuario tiene una cuenta, pero se encuentra inhabilitada, comuniquese con el administrador del sistema',
        400
      )
    );
  }
  /* Esta es una validación para verificar si el usuario ya está registrado en la base de datos, pero
  la cuenta está deshabilitada. */
  if (user) {
    return next(new AppError('El usuario ya se encuentra registrado', 400));
  }
  
  next();
});
